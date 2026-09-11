import { useState, useEffect } from "react";

import Header from "../components/Home/01_Header";
import NavButtons from "../components/Home/02_NavButtons";
import Display from "../components/Home/03_Display";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const Home = () => {
  const [activeSection, setActiveSection] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    quantity: 1,
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`${API_URL}/products`);
      if (!res.ok) {
        throw new Error("Failed to fetch products from server");
      }
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getButtonClass = (section) => {
    const base =
      "px-6 py-2 rounded-full text-sm font-medium transition-all duration-200";
    if (activeSection === section) {
      return `${base} bg-[#e8f0fe] text-[#1a73e8]`;
    }
    return `${base} bg-white text-[#5f6368] border border-[#dadce0] hover:bg-[#f1f3f4]`;
  };

const handleDelete = async (id) => {
  try {
    const res = await fetch(`${API_URL}/products/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      // กรองเอาสินค้าชิ้นที่ถูกลบออกไปจาก State บนหน้าจอ
      setProducts(products.filter((item) => item.id !== id));
    }
  } catch (error) {
    console.error("Error deleting product:", error);
  }
};

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${API_URL}/products`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            price: Number(formData.price),
            quantity: Number(formData.quantity),
          }),
        },
      );

      if (res.ok) {
        const newProduct = await res.json();
        setProducts([...products, newProduct]);
        setFormData({ name: "", price: "", quantity: 1 });
      }
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  const handleUpdate = async (id, updatedData) => {
    try {
      const res = await fetch(
        `${API_URL}/products/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );
      if (res.ok) {
        const updatedProduct = await res.json();
        setProducts(
          products.map((item) => (item.id === id ? updatedProduct : item))
        );
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className="flex flex-col items-center pt-16 px-6 pb-16 min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 flex justify-center items-center opacity-[0.2] pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1557683304-673a23048d34?q=80&w=564&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="BG"
          className="w-[3400px]"
        />
      </div>

      {/* 1. Header */}
      <Header />
      {/* 2. Buttons Container  */}
      <NavButtons
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        getButtonClass={getButtonClass}
      />
      {/* 3. Section Display  */}
      <Display
        activeSection={activeSection}
        members={products}
        loading={loading}
        error={error}
        handleDelete={handleDelete}
        handleUpdate={handleUpdate}
        formData={formData}
        setFormData={setFormData}
        handleCreate={handleCreate}
      />
    </div>
  );
};

export default Home;
