const Contact = () => {
    return (
        <div className=" flex flex-col h-screen items-center justify-center overflow-auto ">
        <section className="bg-indigo-300 dark:bg-zinc-400 mt-32 mb-10 w-1/2 opacity-80 rounded-lg">
        <div className="p-7">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-zinc-200">Contact Us</h2>
            <p className="lg:mb-10 font-light text-center text-gray-500 dark:text-zinc-200 sm:text-xl">Got a technical issue or you just want to say Hi 👋 Let us know.</p>
            <form className="space-y-8">
                <div>
                    <label htmlFor="email" className="block mb-2 font-medium text-gray-900 dark:text-zinc-200 text-lg">Your email</label>
                    <input type="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-indigo-500 dark:border-gray-600 dark:placeholder-zinc-200 dark:text-zinc-200 dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="example@email.com" required />
                </div>
                <div>
                    <label htmlFor="subject" className="block mb-2 text-lg font-medium text-gray-900 dark:text-zinc-200">Subject</label>
                    <input type="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-indigo-500 dark:border-gray-600 dark:placeholder-zinc-200 dark:text-zinc-200 dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="example@email.com" required />
                </div>
                <div className="sm:col-span-2">
                    <label htmlFor="message" className="block mb-2 text-lg font-medium text-gray-900 dark:text-zinc-200">Your message</label>
                    <textarea id="message" rows="6" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-indigo-500 dark:border-gray-600 dark:placeholder-zinc-200 dark:text-zinc-200 dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Leave a message..."></textarea>
                </div>
                <button type="submit" className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-indigo-500 sm:w-fit hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Send message</button>
            </form>
        </div>
      </section>
      </div>
    )
};

export default Contact;