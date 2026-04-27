import Image from 'next/image'
import {
  FaTwitter,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaPinterestP,
} from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-white mt-4">
      <div className="max-w-auto mx-auto px-4 py-14">

        {/* ===== TOP GRID ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-11">

          {/* Brand */}
          <div>
            <h4 className="text-sm font-semibold mb-4">
              SWOO – 1ST NYC TECH ONLINE MARKET
            </h4>

            <p className="text-xs text-gray-500 mb-1">HOTLINE 24/7</p>
            <p className="text-xl font-bold text-orange-500 mb-4">
              (025) 3686 25 16
            </p>

            <p className="text-sm text-gray-600 leading-relaxed mb-5">
              257 Thatcher Road St, Brooklyn, Manhattan,<br />
              NY 10092<br />
              contact@swootechmart.com
            </p>

            {/* Social icons */}
            <div className="flex gap-3">
              {[FaTwitter, FaFacebookF, FaInstagram, FaYoutube, FaPinterestP].map(
                (Icon, i) => (
                  <div
                    key={i}
                    className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition cursor-pointer"
                  >
                    <Icon size={13} />
                  </div>
                )
              )}
            </div>
          </div>

          {/* Columns */}
          {[
            {
              title: 'TOP CATEGORIES',
              items: [
                'Laptops',
                'PC & Computers',
                'Cell Phones',
                'Tablets',
                'Gaming & VR',
                'Networks',
                'Cameras',
                'Sounds',
                'Office',
              ],
            },
            {
              title: 'COMPANY',
              items: [
                'About Swoo',
                'Contact',
                'Career',
                'Blog',
                'Sitemap',
                'Store Locations',
              ],
            },
            {
              title: 'HELP CENTER',
              items: [
                'Customer Service',
                'Policy',
                'Terms & Conditions',
                'Track Order',
                'FAQs',
                'My Account',
                'Product Support',
              ],
            },
            {
              title: 'PARTNER',
              items: ['Become Seller', 'Affiliate', 'Advertise', 'Partnership'],
            },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold mb-4">{col.title}</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                {col.items.map((item) => (
                  <li
                    key={item}
                    className="hover:text-black cursor-pointer"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ===== NEWSLETTER ROW ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mt-3">

          {/* Selects */}
          <div className="flex gap-4">
            <select className="border rounded-md px-4 py-2 text-sm">
              <option>USD</option>
              <option>INR</option>
            </select>
            <select className="border rounded-md px-4 py-2 text-sm">
              <option>Eng</option>
              <option>Fr</option>
            </select>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-sm font-semibold mb-3">
              SUBSCRIBE & GET <span className="text-orange-500">10% OFF</span> FOR
              YOUR FIRST ORDER
            </h4>

            <div className="flex border-b">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 py-2 text-sm outline-none"
              />
              <button className="text-sm font-semibold text-orange-500">
                SUBSCRIBE
              </button>
            </div>

            <p className="text-xs text-gray-500 mt-2">
              By subscribing, you’re accepted our{' '}
              <span className="underline cursor-pointer">Policy</span>
            </p>
          </div>
        </div>

        {/* ===== BOTTOM BAR ===== */}
        <div className="border-t mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-gray-500">

          <p>
            © 2024 <span className="font-medium text-black">Shawonetc3</span>. All
            Rights Reserved
          </p>

          {/* Payments */}
          <div className="flex items-center gap-4">
            {[
              'https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg',
              'https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png',
              'https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png',
              'https://upload.wikimedia.org/wikipedia/commons/3/3f/Stripe_Logo%2C_revised_2016.svg',
              'https://upload.wikimedia.org/wikipedia/commons/9/9e/Klarna_Logo_black.svg',
            ].map((src, i) => (
              <div key={i} className="relative h-6 w-12">
                <img src={src} alt="payment"  className="object-contain" />
              </div>
            ))}
          </div>

          <span className="text-blue-500 hover:underline cursor-pointer">
            Mobile Site
          </span>
        </div>
      </div>
    </footer>
  )
}
