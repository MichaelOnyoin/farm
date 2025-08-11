// app/page.tsx
//import Image from "next/image";

export default function Hero() {
  return (
    <main className="bg-green-50 text-gray-800">
      {/* Header */}
      <header className="bg-green-600 text-white">
        <div className="w-full mx-auto flex items-center justify-between px-6 py-4">
          {/* <h1 className="text-2xl font-bold">🥑 Fresh Avocado Co.</h1> */}
          <img src="jamon-back.png" alt="" className="h-40 w-40 fit" />
          <nav>
            <a href="#about" className="px-3 hover:underline">About</a>
            <a href="#products" className="px-3 hover:underline">Products</a>
            <a href="#contact" className="px-3 hover:underline">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-16 text-center">
        <h2 className="text-4xl font-bold mb-4">The Freshest Avocados, Delivered to You</h2>
        <p className="mb-6 text-lg text-gray-600">
          From farm to table — our avocados are handpicked for maximum flavor and nutrition.
        </p>
        <a
          href="#contact"
          className="bg-green-600 text-white px-6 py-3 rounded-full text-lg shadow hover:bg-green-700"
        >
          Order Now
        </a>
      </section>

      {/* About Section */}
      <section id="about" className="bg-white py-12">
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="text-2xl font-bold mb-4">Why Choose Us?</h3>
          <p className="text-gray-700 leading-relaxed">
            We work with local farmers to ensure every avocado is sustainably grown and harvested at peak ripeness.
            Our commitment to quality means you get creamy, delicious avocados every time.
          </p>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="bg-green-100 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="text-2xl font-bold mb-6">Our Products</h3>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Fresh Basket",
                desc: "Perfectly ripe avocados, delivered in eco-friendly packaging.",
                img: "https://images.unsplash.com/photo-1606788075761-618c3fd45d1e",
              },
              {
                title: "Avocado Toast Kit",
                desc: "Includes fresh avocados, sourdough bread, and seasoning.",
                img: "https://images.unsplash.com/photo-1550258987-190a2d41a8ba",
              },
              {
                title: "Guacamole Pack",
                desc: "All you need for the ultimate party guac.",
                img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
              },
            ].map((product, index) => (
              <div key={index} className="bg-white rounded-lg shadow p-4">
                {/* <Image
                  src={product.img}
                  alt={product.title}
                  width={400}
                  height={300}
                  className="rounded-lg mb-4"
                /> */}
                <img src={product.img} alt={product.title} className="rounded-lg mb-4 w-full h-100 object-cover" />
                <h4 className="text-lg font-semibold">{product.title}</h4>
                <p className="text-gray-600">{product.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-white py-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h3 className="text-2xl font-bold mb-4">Get in Touch</h3>
          <p className="text-gray-700 mb-6">
            Ready to taste the best avocados in town? Contact us today.
          </p>
          <a
            href="mailto:orders@freshavocado.com"
            className="bg-green-600 text-white px-6 py-3 rounded-full text-lg shadow hover:bg-green-700"
          >
            Email Us
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-600 text-white text-center py-4">
        &copy; {new Date().getFullYear()} Fresh Avocado Co. All rights reserved.
      </footer>
    </main>
  );
}
