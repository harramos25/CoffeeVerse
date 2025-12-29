import React from 'react';
import Navbar3D from './Navbar3D'; // The Dynamic Glass Capsule
import Toast from './Toast';
import FooterGate from './FooterGate'; // The Closing Gate

const Layout = ({ children }) => {
    return (
        <div className="layout-wrapper" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar3D />
            <main style={{ flex: 1, paddingTop: '0' }}>
                {children}
            </main>
            <Toast />
            <FooterGate />
        </div>
    );
};

export default Layout;
