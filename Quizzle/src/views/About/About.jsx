const About = () => {
  return (
      <div className="h-screen flex flex-col">
        <div className="m-10 items-center mt-20 overflow-auto">
      <div className="bg-indigo-300 dark:bg-indigo-700 opacity-90 rounded-lg py-24 sm:py-32">
    <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
      <div className="max-w-2xl">
        <h2 className="text-3xl font-bold tracking-tight text-white dark:text-zinc-200 sm:text-4xl">Meet our team</h2>
        <p className="mt- text-lg leading-8 text-gray-600 dark:text-zinc-200">Welcome to the heart of our organization, where passion meets expertise and innovation thrives. Get to know the exceptional individuals who form the backbone of our team, each contributing their unique skills and talents to bring our vision to life.</p>
      </div>
      <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
        <li>
          <div className="flex items-center gap-x-6">
          <img className="h-16 w-16 rounded-full" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
            <div>
              <h3 className="text-base font-semibold leading-7 tracking-tight text-white dark:text-zinc-200">Todor Todorov</h3>
              <p className="text-sm font-semibold leading-6 text-indigo-600 dark:text-orange-200">Co-Founder / CEO</p>
            </div>
          </div>
        </li>
        <li>
          <div className="flex items-center gap-x-6">
          <img className="h-16 w-16 rounded-full" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png" alt="" />
            <div>
              <h3 className="text-base font-semibold leading-7 tracking-tight text-white dark:text-zinc-200">Plamen Milanov</h3>
              <p className="text-sm font-semibold leading-6 text-indigo-600 dark:text-orange-200">Co-Founder / CEO</p>
            </div>
          </div>
        </li>
        <li>
          <div className="flex items-center gap-x-6">
          <img className="h-16 w-16 rounded-full" src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
            <div>
              <h3 className="text-base font-semibold leading-7 tracking-tight text-white dark:text-zinc-200">Lyuba Boyadzhieva</h3>
              <p className="text-sm font-semibold leading-6 text-indigo-600 dark:text-orange-200">Co-Founder / CEO</p>
            </div>
          </div>
        </li>
  
        {/* <!-- More people... --> */}
      </ul>
    </div>
  </div>
      </div>
      </div>
    )
  }
  
  export default About