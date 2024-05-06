import { useEffect, useState } from 'react';
import { HiOutlineArrowUp } from 'react-icons/hi'; 
import { animateScroll as scroll } from 'react-scroll'; 
import Nav from '../components/Nav'
import bg from '../assets/img/back.jpg'
import Footer from '../sections/Footer'
import logo from '../assets/img/Logo.png'

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    scroll.scrollToTop({
      duration: 500, 
    });
  };

  return (
    <button
    className={`fixed right-4 bottom-12 z-50 bg-dark hover:bg-light-dark text-white rounded-xl p-3 ${isVisible ? 'opacity-100 transition-opacity duration-300 animate-bounce' : 'opacity-0 transition-opacity duration-300'}`}
    onClick={scrollToTop}
  >
    <HiOutlineArrowUp className="w-5 h-12" />
  </button>
  
  );
};

const Contactpage = () => {
  useEffect(() => {
    document.title = 'Contact - Spa-ntaneous'
  },[]);
   
  return (
    <main>
      <section>
        <Nav />
      </section>

      <header className=" mx-auto h-[20rem] flex justify-center items-center bg-center bg-cover border-b-8 border-dark" style={{backgroundImage: `url(${bg})`}}>

      <div className="">
        
      <h1 className='text-[6rem] text-dark font-extrabold font-palanquin text-center'>Contact Us</h1>
      
        <h1 className='text-center tracking-widest bg-dark p-2 text-light '><a className='mr-2 hover:text-light-dark transition-colors duration-200 hover:underline' href='/'><span>Home</span></a>/<span className='ml-2'>Contact</span></h1>

        </div>

      </header>
      
      <section>
      <div className=" px-4">
     
      <div className=" p-9">
        <div className="container mx-auto ">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className=" border-light-dark p-4 lg:p-8 w-full lg:w-1/2 h-[580px] bg-white border-2 ">
              <div className="flex justify-center mb-10">
              <img className="w-60 " src={logo} alt="Logo" />

              </div>
              <form className="space-y-4 m-4">
                <div>
                  <label htmlFor="name" className="block mb-1">Name</label>
                  <input type="text" id="name" name="name" className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-dark" />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-1">Email</label>
                  <input type="email" id="email" name="email" className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-dark" />
                </div>
                <div>
                  <label htmlFor="message" className="block mb-1">Message</label>
                  <textarea id="message" name="message" rows="4" className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-dark" style={{ resize: 'none' }}></textarea>
                </div>
                <button type="submit" className="w-full bg-dark text-white py-2 rounded-md hover:bg-light-dark focus:outline-none">Submit</button>
              </form>
            </div>
            <div className="w-full lg:w-1/2">
              <div className="bg-dark p-1 ">
                <iframe className="w-full h-[20rem] lg:h-[35.7rem]" src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d6534.2417537176225!2d123.72336418854759!3d13.144515873602993!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sph!4v1712553813306!5m2!1sen!2sph" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      </section>

      <section>
        <Footer/>
      </section>
      <ScrollToTopButton />
    </main>
  )
}

export default Contactpage