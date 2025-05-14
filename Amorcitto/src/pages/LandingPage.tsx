const LandingPage = () => {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center px-6">
        <h1 className="text-5xl font-bold mb-6">Welcome to AmorCitto Retail POS</h1>
        <p className="text-lg mb-6">Streamline your retail operations with powerful inventory, sales, and customer tools.</p>
        <div className="space-x-4">
          <a href="/login" className="bg-white text-blue-600 px-6 py-2 rounded shadow hover:bg-gray-100">Get Started</a>
          <a href="/products" className="border border-white px-6 py-2 rounded hover:bg-white hover:text-blue-600">View Products</a>
        </div>
      </div>
    );
  };
  
  export default LandingPage;
  