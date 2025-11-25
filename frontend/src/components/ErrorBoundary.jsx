import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        // Error logging can be added here for production monitoring
        if (process.env.NODE_ENV === 'development') {
            console.warn('Error caught by ErrorBoundary:', error, errorInfo);
        }
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={styles.container}>
                    <div style={styles.card}>
                        <h1 style={styles.title}>⚠️ Algo salió mal</h1>
                        <p style={styles.message}>
                            Lo sentimos, ha ocurrido un error inesperado.
                        </p>
                        <button
                            style={styles.button}
                            onClick={() => window.location.href = '/'}
                        >
                            Volver al inicio
                        </button>
                        <button
                            style={styles.buttonSecondary}
                            onClick={() => window.location.reload()}
                        >
                            Recargar página
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        padding: '20px',
    },
    card: {
        backgroundColor: '#fff',
        padding: '40px',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        maxWidth: '500px',
        textAlign: 'center',
    },
    title: {
        color: '#d32f2f',
        marginBottom: '20px',
        fontSize: '24px',
    },
    message: {
        color: '#555',
        marginBottom: '30px',
        fontSize: '16px',
    },
    button: {
        padding: '12px 24px',
        backgroundColor: '#4CAF50',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        fontSize: '16px',
        cursor: 'pointer',
        marginRight: '10px',
    },
    buttonSecondary: {
        padding: '12px 24px',
        backgroundColor: '#2196F3',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        fontSize: '16px',
        cursor: 'pointer',
    },
};

export default ErrorBoundary;
