// src/components/SEOHead.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Componente SEOHead para gestionar meta tags dinámicamente
 * 
 * @param {Object} props - Propiedades del componente
 * @param {string} props.title - Título de la página
 * @param {string} props.description - Descripción de la página
 * @param {string} props.keywords - Palabras clave separadas por comas
 * @param {string} props.image - URL de la imagen para compartir en redes sociales
 * @param {string} props.type - Tipo de contenido (website, article, product)
 * @param {Object} props.structuredData - Datos estructurados adicionales
 */
const SEOHead = ({
  title = 'PREXCOL - Plataforma de Comercio Electrónico | E-commerce Colombia',
  description = 'PREXCOL es la plataforma líder de comercio electrónico en Colombia. Conectamos proveedores, compradores y clientes en un ecosistema digital eficiente.',
  keywords = 'PREXCOL, comercio electrónico Colombia, e-commerce, plataforma B2B',
  image = 'https://prexcol.com/logo-1200x1200.png',
  type = 'website',
  structuredData = null,
  canonicalUrl = null,
}) => {
  const location = useLocation();
  const currentUrl = `https://prexcol.com${location.pathname}`;
  const finalCanonicalUrl = canonicalUrl || currentUrl;

  useEffect(() => {
    // Actualizar el título
    document.title = title;

    // Función helper para actualizar o crear meta tags
    const updateMetaTag = (selector, content, attribute = 'content') => {
      let element = document.querySelector(selector);
      if (element) {
        element.setAttribute(attribute, content);
      } else {
        element = document.createElement('meta');
        const [attr, value] = selector.replace(/[\[\]]/g, '').split('=');
        element.setAttribute(attr, value.replace(/['"]/g, ''));
        element.setAttribute(attribute, content);
        document.head.appendChild(element);
      }
    };

    // Meta tags básicos
    updateMetaTag('[name="description"]', description);
    updateMetaTag('[name="keywords"]', keywords);

    // Open Graph
    updateMetaTag('[property="og:title"]', title);
    updateMetaTag('[property="og:description"]', description);
    updateMetaTag('[property="og:image"]', image);
    updateMetaTag('[property="og:url"]', currentUrl);
    updateMetaTag('[property="og:type"]', type);

    // Twitter Cards
    updateMetaTag('[name="twitter:title"]', title);
    updateMetaTag('[name="twitter:description"]', description);
    updateMetaTag('[name="twitter:image"]', image);

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', finalCanonicalUrl);
    } else {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      canonical.setAttribute('href', finalCanonicalUrl);
      document.head.appendChild(canonical);
    }

    // Datos estructurados (Schema.org)
    if (structuredData) {
      let script = document.querySelector('script[data-type="structured-data"]');
      if (!script) {
        script = document.createElement('script');
        script.setAttribute('type', 'application/ld+json');
        script.setAttribute('data-type', 'structured-data');
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(structuredData);
    }
  }, [title, description, keywords, image, type, currentUrl, finalCanonicalUrl, structuredData]);

  return null; // Este componente no renderiza nada visible
};

export default SEOHead;

/**
 * Configuraciones SEO predefinidas para diferentes páginas
 */
export const SEOConfigs = {
  home: {
    title: 'PREXCOL - Plataforma de Comercio Electrónico | E-commerce Colombia',
    description: 'PREXCOL es la plataforma líder de comercio electrónico en Colombia. Conectamos proveedores, compradores y clientes en un ecosistema digital eficiente. Gestión de productos, pedidos, pagos y logística en tiempo real.',
    keywords: 'PREXCOL, comercio electrónico Colombia, e-commerce, plataforma B2B, gestión de inventario, pedidos online, marketplace Colombia',
    type: 'website',
  },
  
  login: {
    title: 'Iniciar Sesión - PREXCOL | Acceso a tu Cuenta',
    description: 'Inicia sesión en PREXCOL para acceder a tu dashboard, gestionar productos, realizar pedidos y administrar tu negocio en línea.',
    keywords: 'login PREXCOL, iniciar sesión, acceso cuenta, e-commerce Colombia',
    type: 'website',
  },
  
  register: {
    title: 'Registrarse - PREXCOL | Crear Cuenta Nueva',
    description: 'Únete a PREXCOL hoy. Crea tu cuenta gratuita y comienza a vender o comprar productos en la plataforma líder de comercio electrónico en Colombia.',
    keywords: 'registro PREXCOL, crear cuenta, registrarse e-commerce, nuevos usuarios',
    type: 'website',
  },
  
  productos: {
    title: 'Catálogo de Productos - PREXCOL | Compra al Mayor y Detal',
    description: 'Explora nuestro catálogo completo de productos. Miles de artículos disponibles para compra al mayor y detal. Precios competitivos y envío rápido en toda Colombia.',
    keywords: 'catálogo productos Colombia, compra mayorista, productos e-commerce, inventario online',
    type: 'website',
  },
  
  cart: {
    title: 'Carrito de Compras - PREXCOL | Finalizar Pedido',
    description: 'Revisa tu carrito de compras y finaliza tu pedido en PREXCOL. Proceso de pago seguro y envío rápido.',
    keywords: 'carrito compras, checkout, finalizar pedido, pago online',
    type: 'website',
  },
  
  dashboard: {
    title: 'Panel de Control - PREXCOL | Gestiona tu Negocio',
    description: 'Accede a tu panel de control en PREXCOL. Gestiona productos, pedidos, clientes y toda tu operación comercial desde un solo lugar.',
    keywords: 'dashboard e-commerce, panel control, gestión negocios, administración online',
    type: 'website',
  },
  
  adminDashboard: {
    title: 'Panel Administrativo - PREXCOL | Gestión Completa',
    description: 'Panel de administración completo para gestionar usuarios, productos, pedidos y toda la plataforma PREXCOL.',
    keywords: 'admin panel, administración plataforma, gestión usuarios, control total',
    type: 'website',
  },

  profile: {
    title: 'Mi Perfil - PREXCOL | Información Personal',
    description: 'Gestiona tu información personal, actualiza tus datos de contacto y configura tu cuenta en PREXCOL.',
    keywords: 'perfil usuario, información personal, configuración cuenta',
    type: 'website',
  },

  orders: {
    title: 'Mis Pedidos - PREXCOL | Historial de Compras',
    description: 'Consulta el historial completo de tus pedidos, rastrea envíos y gestiona devoluciones en PREXCOL.',
    keywords: 'historial pedidos, tracking envíos, mis compras, estado pedidos',
    type: 'website',
  },
};

/**
 * Hook personalizado para SEO de productos
 */
export const useProductSEO = (product) => {
  if (!product) return SEOConfigs.productos;

  return {
    title: `${product.nombre} - PREXCOL | Comprar Online`,
    description: `${product.descripcion || product.nombre}. Precio: $${product.precio.toLocaleString('es-CO')}. Disponible en PREXCOL. Compra segura con envío a toda Colombia.`,
    keywords: `${product.nombre}, comprar ${product.categoria || 'producto'}, precio ${product.nombre}, ${product.categoria || 'producto'} Colombia`,
    type: 'product',
    image: product.imagen || 'https://prexcol.com/logo-1200x1200.png',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.nombre,
      description: product.descripcion || product.nombre,
      image: product.imagen,
      offers: {
        '@type': 'Offer',
        price: product.precio,
        priceCurrency: 'COP',
        availability: product.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
        url: `https://prexcol.com/productos/${product.id}`,
      },
      brand: {
        '@type': 'Brand',
        name: product.proveedor?.nombre || 'PREXCOL',
      },
      aggregateRating: product.rating ? {
        '@type': 'AggregateRating',
        ratingValue: product.rating,
        reviewCount: product.reviewCount || 1,
      } : undefined,
    },
  };
};
