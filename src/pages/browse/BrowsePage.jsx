// src/pages/browse/BrowsePage.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { carsData } from '../../data/carsData';
import Footer from '../../components/layout/Footer';
import './BrowsePage.css';

const CARS_PER_PAGE = 9;

const makes = [...new Set(carsData.map(c => c.name.split(' ')[0]))].sort();
const years = [...new Set(carsData.map(c => c.year))].sort((a, b) => b - a);
const fuels = [...new Set(carsData.map(c => c.fuel))].sort();
const categories = [...new Set(carsData.map(c => c.category))].sort();
const maxPrice = Math.max(...carsData.map(c => Number(c.price.replace(/[^0-9]/g, ''))));

const BrowsePage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    make: searchParams.get('make') || '',
    year: searchParams.get('year') || '',
    fuel: searchParams.get('fuel') || '',
    category: searchParams.get('category') || '',
    condition: '',
    maxPrice: maxPrice,
  });
  const [sort, setSort] = useState('newest');
  const [viewMode, setViewMode] = useState('grid');
  const [page, setPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [saved, setSaved] = useState([]);

  useEffect(() => { setPage(1); }, [filters, search, sort]);

  const toggleSave = (e, id) => {
    e.stopPropagation();
    setSaved(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  };

  const updateFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({ make: '', year: '', fuel: '', category: '', condition: '', maxPrice });
    setSearch('');
  };

  const activeFilterCount = Object.entries(filters).filter(([k, v]) =>
    k === 'maxPrice' ? v < maxPrice : v !== ''
  ).length + (search ? 1 : 0);

  // Filter + sort
  const filtered = useMemo(() => {
    let result = [...carsData];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q) ||
        c.fuel.toLowerCase().includes(q)
      );
    }

    if (filters.make) result = result.filter(c => c.name.split(' ')[0] === filters.make);
    if (filters.year) result = result.filter(c => c.year === Number(filters.year));
    if (filters.fuel) result = result.filter(c => c.fuel === filters.fuel);
    if (filters.category) result = result.filter(c => c.category === filters.category);
    if (filters.condition) result = result.filter(c =>
      filters.condition === 'new' ? c.mileage === '0 miles' : c.mileage !== '0 miles'
    );
    result = result.filter(c =>
      Number(c.price.replace(/[^0-9]/g, '')) <= filters.maxPrice
    );

    switch (sort) {
      case 'price-low': return result.sort((a, b) =>
        Number(a.price.replace(/[^0-9]/g, '')) - Number(b.price.replace(/[^0-9]/g, '')));
      case 'price-high': return result.sort((a, b) =>
        Number(b.price.replace(/[^0-9]/g, '')) - Number(a.price.replace(/[^0-9]/g, '')));
      case 'newest': return result.sort((a, b) => b.year - a.year);
      case 'oldest': return result.sort((a, b) => a.year - b.year);
      default: return result;
    }
  }, [search, filters, sort]);

  const totalPages = Math.ceil(filtered.length / CARS_PER_PAGE);
  const paginated = filtered.slice(0, page * CARS_PER_PAGE);
  const hasMore = page < totalPages;

  return (
    <div className="browse-page">

      {/* Top bar */}
      <div className="browse-topbar">
        <div className="browse-topbar-inner">
          <div className="browse-search-wrap">
            <i className="bi bi-search"></i>
            <input
              type="text"
              placeholder="Search by name, category, fuel type..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {search && (
              <button className="search-clear" onClick={() => setSearch('')}>
                <i className="bi bi-x"></i>
              </button>
            )}
          </div>

          <div className="browse-controls">
            <select value={sort} onChange={e => setSort(e.target.value)} className="sort-select">
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>

            <div className="view-toggle">
              <button
                className={viewMode === 'grid' ? 'active' : ''}
                onClick={() => setViewMode('grid')}
                title="Grid view"
              >
                <i className="bi bi-grid-3x3-gap"></i>
              </button>
              <button
                className={viewMode === 'list' ? 'active' : ''}
                onClick={() => setViewMode('list')}
                title="List view"
              >
                <i className="bi bi-list-ul"></i>
              </button>
            </div>

            <button
              className={`filter-toggle-btn ${activeFilterCount > 0 ? 'has-filters' : ''}`}
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <i className="bi bi-sliders"></i>
              Filters
              {activeFilterCount > 0 && (
                <span className="filter-count">{activeFilterCount}</span>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="browse-body">

        {/* Sidebar */}
        <aside className={`browse-sidebar ${sidebarOpen ? 'browse-sidebar--open' : ''}`}>

          <div className="sidebar-header">
            <h3><i className="bi bi-funnel"></i> Filters</h3>
            {activeFilterCount > 0 && (
              <button className="clear-btn" onClick={clearFilters}>
                Clear all
              </button>
            )}
          </div>

          {/* Category */}
          <div className="filter-group">
            <label>Category</label>
            <div className="filter-chips">
              {categories.map(cat => (
                <button
                  key={cat}
                  className={`chip ${filters.category === cat ? 'chip--active' : ''}`}
                  onClick={() => updateFilter('category', filters.category === cat ? '' : cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Make */}
          <div className="filter-group">
            <label>Make</label>
            <select
              value={filters.make}
              onChange={e => updateFilter('make', e.target.value)}
              className="filter-select"
            >
              <option value="">All Makes</option>
              {makes.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>

          {/* Year */}
          <div className="filter-group">
            <label>Year</label>
            <select
              value={filters.year}
              onChange={e => updateFilter('year', e.target.value)}
              className="filter-select"
            >
              <option value="">All Years</option>
              {years.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>

          {/* Fuel */}
          <div className="filter-group">
            <label>Fuel Type</label>
            <div className="filter-chips">
              {fuels.map(f => (
                <button
                  key={f}
                  className={`chip ${filters.fuel === f ? 'chip--active' : ''}`}
                  onClick={() => updateFilter('fuel', filters.fuel === f ? '' : f)}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Condition */}
          <div className="filter-group">
            <label>Condition</label>
            <div className="filter-chips">
              {['new', 'used'].map(c => (
                <button
                  key={c}
                  className={`chip ${filters.condition === c ? 'chip--active' : ''}`}
                  onClick={() => updateFilter('condition', filters.condition === c ? '' : c)}
                >
                  {c === 'new' ? 'Brand New' : 'Used'}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="filter-group">
            <label>
              Max Price:
              <strong> ${Number(filters.maxPrice).toLocaleString()}</strong>
            </label>
            <input
              type="range"
              min={0}
              max={maxPrice}
              step={10000}
              value={filters.maxPrice}
              onChange={e => updateFilter('maxPrice', Number(e.target.value))}
              className="price-range"
            />
            <div className="price-range-labels">
              <span>$0</span>
              <span>${Number(maxPrice).toLocaleString()}</span>
            </div>
          </div>

        </aside>

        {/* Overlay for mobile sidebar */}
        {sidebarOpen && (
          <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />
        )}

        {/* Main content */}
        <main className="browse-main">

          {/* Results count */}
          <div className="results-bar">
            <p>
              <strong>{filtered.length}</strong> cars found
              {activeFilterCount > 0 && (
                <button className="clear-inline" onClick={clearFilters}>
                  Clear filters <i className="bi bi-x"></i>
                </button>
              )}
            </p>
          </div>

          {/* Empty state */}
          {filtered.length === 0 && (
            <div className="empty-state">
              <i className="bi bi-car-front"></i>
              <h3>No cars found</h3>
              <p>Try adjusting your filters or search term</p>
              <button onClick={clearFilters}>Clear All Filters</button>
            </div>
          )}

          {/* Grid view */}
          {viewMode === 'grid' && (
            <div className="cars-grid">
              {paginated.map(car => (
                <div
                  className="car-card"
                  key={car.id}
                  onClick={() => navigate(`/car/${car.id}`)}
                >
                  <div className="card-image-wrap">
                    <img src={car.image} alt={car.name} loading="lazy" />
                    <button
                      className={`save-btn ${saved.includes(car.id) ? 'save-btn--saved' : ''}`}
                      onClick={e => toggleSave(e, car.id)}
                    >
                      <i className={`bi ${saved.includes(car.id) ? 'bi-heart-fill' : 'bi-heart'}`}></i>
                    </button>
                    <span className="card-badge">{car.category}</span>
                    {car.mileage === '0 miles' && (
                      <span className="card-badge card-badge--new">New</span>
                    )}
                  </div>
                  <div className="card-body">
                    <div className="card-top">
                      <h3 className="card-title">{car.name}</h3>
                      <span className="card-price">{car.price}</span>
                    </div>
                    <div className="card-specs">
                      <span><i className="bi bi-calendar3"></i>{car.year}</span>
                      <span><i className="bi bi-speedometer2"></i>{car.mileage}</span>
                      <span><i className="bi bi-fuel-pump"></i>{car.fuel}</span>
                    </div>
                    <button className="card-btn">
                      View Details <i className="bi bi-arrow-right"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* List view */}
          {viewMode === 'list' && (
            <div className="cars-list">
              {paginated.map(car => (
                <div
                  className="list-card"
                  key={car.id}
                  onClick={() => navigate(`/car/${car.id}`)}
                >
                  <div className="list-card-image">
                    <img src={car.image} alt={car.name} loading="lazy" />
                    {car.mileage === '0 miles' && (
                      <span className="card-badge card-badge--new">New</span>
                    )}
                  </div>
                  <div className="list-card-body">
                    <div className="list-card-top">
                      <div>
                        <h3>{car.name}</h3>
                        <span className="list-category">{car.category}</span>
                      </div>
                      <span className="card-price">{car.price}</span>
                    </div>
                    <p className="list-desc">{car.description}</p>
                    <div className="card-specs">
                      <span><i className="bi bi-calendar3"></i>{car.year}</span>
                      <span><i className="bi bi-speedometer2"></i>{car.mileage}</span>
                      <span><i className="bi bi-fuel-pump"></i>{car.fuel}</span>
                    </div>
                  </div>
                  <div className="list-card-actions">
                    <button
                      className={`save-btn-list ${saved.includes(car.id) ? 'save-btn--saved' : ''}`}
                      onClick={e => toggleSave(e, car.id)}
                    >
                      <i className={`bi ${saved.includes(car.id) ? 'bi-heart-fill' : 'bi-heart'}`}></i>
                    </button>
                    <button className="card-btn list-view-btn">
                      View Details <i className="bi bi-arrow-right"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Load more */}
          {hasMore && (
            <div className="load-more-wrap">
              <p className="load-more-info">
                Showing {paginated.length} of {filtered.length} cars
              </p>
              <button className="load-more-btn" onClick={() => setPage(p => p + 1)}>
                Load More Cars <i className="bi bi-arrow-down"></i>
              </button>
            </div>
          )}

        </main>
      </div>

      <Footer />
    </div>
  );
};

export default BrowsePage;