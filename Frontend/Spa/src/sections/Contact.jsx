import logo from '../assets/img/Logo.png'; 


const Contact = () => {
  return (
    <div className=" px-4 transform scale-x-[-1]">
      <div className='text-center mb-[rem]  mx-auto'>
        <h1 className='font-bold font-cursive text-custom text-dark'>Contact Us</h1>
        <div className="flex justify-center">
        <div className="border-2 border-dark mt-5 w-[8rem] mb-9"></div>
      </div>
     </div>
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
  );
};

export default Contact;
