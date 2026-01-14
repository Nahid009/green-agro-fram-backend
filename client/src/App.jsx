import { useEffect, useState } from 'react';

function App() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  // তোর লাইভ সার্ভারের লিংক
  const apiUrl = 'https://green-agro-fram-backend.onrender.com/products';

  useEffect(() => {
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  const handleAddProduct = (e) => {
    e.preventDefault();
    const newProduct = { name, price, description };

    fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct)
    })
    .then(res => res.json())
    .then(data => {
      alert('আইটেম যোগ হয়েছে! 🥛');
      setProducts([...products, data]);
      setName('');
      setPrice('');
      setDescription('');
    })
    .catch(err => alert('সমস্যা হয়েছে ❌'));
  };

  const handleDelete = (id) => {
    if(!window.confirm("আপনি কি এই আইটেমটি ডিলিট করতে চান?")) return;
    
    fetch(`${apiUrl}/${id}`, { method: 'DELETE' })
      .then(() => {
        const remaining = products.filter(product => product._id !== id);
        setProducts(remaining);
      })
      .catch(err => console.error(err));
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      
      {/* --- হেডার: মিষ্টির দোকানের ভাব --- */}
      <header style={{ textAlign: 'center', marginBottom: '40px', marginTop: '20px' }}>
        <h1 style={{ color: '#b45309', fontSize: '3rem', textShadow: '2px 2px 4px rgba(0,0,0,0.1)' }}>
          🐄 গ্রীন এগ্রো ডেইরি এন্ড সুইটস 🍯
        </h1>
        <p style={{ color: '#78350f', fontSize: '1.2rem', marginTop: '10px' }}>
          ১০০% খাঁটি দুধ, ঘি, ছানা এবং সুস্বাদু মিষ্টির বিশ্বস্ত প্রতিষ্ঠান
        </p>
      </header>

      {/* --- ইনপুট ফর্ম --- */}
      <div style={{ 
        backgroundColor: 'white', 
        padding: '30px', 
        borderRadius: '20px', 
        boxShadow: '0 10px 25px rgba(217, 119, 6, 0.15)', // গোল্ডেন শ্যাডো
        maxWidth: '500px',
        margin: '0 auto 50px auto',
        border: '2px solid #fcd34d'
      }}>
        <h3 style={{ textAlign: 'center', color: '#b45309', marginBottom: '20px' }}>নতুন আইটেম যুক্ত করুন</h3>
        <form onSubmit={handleAddProduct} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input 
            type="text" 
            placeholder="নাম (যেমন: স্পেশাল রসগোল্লা / খাঁটি ঘি)" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ padding: '12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '16px' }}
          />
          <input 
            type="number" 
            placeholder="দাম (টাকা)" 
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            style={{ padding: '12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '16px' }}
          />
          <textarea 
            placeholder="বিবরণ (যেমন: খাঁটি গরুর দুধের তৈরি, ১ কেজি)" 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ padding: '12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '16px', minHeight: '80px' }}
          />
          <button type="submit" style={{ 
            padding: '12px', 
            backgroundColor: '#d97706', // গাঢ় গোল্ডেন কালার
            color: 'white', 
            border: 'none', 
            borderRadius: '8px', 
            fontSize: '18px', 
            fontWeight: 'bold' 
          }}>
            লিস্টে যোগ করুন ➕
          </button>
        </form>
      </div>

      {/* --- প্রোডাক্ট লিস্ট --- */}
      <h2 style={{ 
        color: '#92400e', 
        borderBottom: '3px solid #f59e0b', 
        paddingBottom: '10px', 
        display: 'inline-block',
        marginBottom: '20px'
      }}>
        আমাদের স্পেশাল আইটেম ({products.length})
      </h2>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
        gap: '25px',
        marginTop: '10px' 
      }}>
        {products.map(product => (
          <div key={product._id} style={{ 
            backgroundColor: 'white',
            borderRadius: '15px', 
            padding: '20px', 
            boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
            border: '1px solid #fde68a', // হালকা হলুদ বর্ডার
            position: 'relative',
            transition: 'transform 0.2s'
          }}>
            {/* আইকন বা ইমোজি */}
            <div style={{ fontSize: '30px', marginBottom: '10px' }}>🥛🍯</div>
            
            <h3 style={{ color: '#1f2937', fontSize: '1.4rem', marginBottom: '5px' }}>{product.name}</h3>
            <p style={{ color: '#d97706', fontWeight: 'bold', fontSize: '1.3rem', margin: '5px 0' }}>৳ {product.price}</p>
            <p style={{ color: '#6b7280', fontSize: '1rem', marginBottom: '20px' }}>{product.description}</p>
            
            <button 
              onClick={() => handleDelete(product._id)}
              style={{ 
                padding: '8px 15px', 
                backgroundColor: '#ef4444', 
                color: 'white', 
                border: 'none', 
                borderRadius: '6px',
                fontSize: '0.9rem',
                width: '100%'
              }}>
              মুছে ফেলুন 🗑️
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;