import React, { useState } from 'react';
import '../../styles/DataTable.css';

/**
 * Componente de tabla de datos con ordenamiento, filtrado y paginación
 * @param {Object} props
 * @param {Array} props.data - Datos a mostrar
 * @param {Array} props.columns - Configuración de columnas
 * @param {number} props.pageSize - Tamaño de página (default: 10)
 * @param {boolean} props.sortable - Permitir ordenamiento
 * @param {boolean} props.filterable - Permitir filtrado
 * @param {function} props.onRowClick - Callback al hacer clic en una fila
 */
export default function DataTable({
  data = [],
  columns = [],
  pageSize = 10,
  sortable = true,
  filterable = true,
  onRowClick
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [filterText, setFilterText] = useState('');

  // Filtrado
  const filteredData = React.useMemo(() => {
    if (!filterText) return data;
    
    return data.filter(row =>
      columns.some(col => {
        const value = row[col.key];
        return value && value.toString().toLowerCase().includes(filterText.toLowerCase());
      })
    );
  }, [data, filterText, columns]);

  // Ordenamiento
  const sortedData = React.useMemo(() => {
    if (!sortConfig.key) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];

      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortConfig]);

  // Paginación
  const totalPages = Math.ceil(sortedData.length / pageSize);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleSort = (key) => {
    if (!sortable) return;
    
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return '⇅';
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  };

  return (
    <div className="data-table-container">
      {filterable && (
        <div className="table-controls">
          <input
            type="text"
            className="table-filter"
            placeholder="Buscar..."
            value={filterText}
            onChange={(e) => {
              setFilterText(e.target.value);
              setCurrentPage(1);
            }}
          />
          <span className="table-count">
            {sortedData.length} resultado{sortedData.length !== 1 ? 's' : ''}
          </span>
        </div>
      )}

      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              {columns.map(col => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col.key)}
                  className={sortable ? 'sortable' : ''}
                  style={{ width: col.width }}
                >
                  <div className="th-content">
                    <span>{col.label}</span>
                    {sortable && <span className="sort-icon">{getSortIcon(col.key)}</span>}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="empty-state">
                  <div className="empty-content">
                    <span className="empty-icon">📭</span>
                    <p>No se encontraron resultados</p>
                  </div>
                </td>
              </tr>
            ) : (
              paginatedData.map((row, idx) => (
                <tr
                  key={row.id || idx}
                  onClick={() => onRowClick && onRowClick(row)}
                  className={onRowClick ? 'clickable' : ''}
                >
                  {columns.map(col => (
                    <td key={col.key}>
                      {col.render ? col.render(row[col.key], row) : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="table-pagination">
          <button
            className="pagination-btn"
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            ← Anterior
          </button>
          
          <div className="pagination-info">
            Página {currentPage} de {totalPages}
          </div>

          <button
            className="pagination-btn"
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
          >
            Siguiente →
          </button>
        </div>
      )}
    </div>
  );
}
