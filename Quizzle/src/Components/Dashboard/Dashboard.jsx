import SingleQuizCard from "../SingleQuizCard/SingleQuizCard";

const Dashboard = () => {
  return (
    <div className="h-screen bg-hero-pattern-2 bg-cover flex flex-col items-center">
                  <div className="max-w-6xl mx-auto px-4 sm:px-6  rounded-lg">
              <div className="pt-32 md:pt-10 ">
                <div className=" text-center pb-12 md:pb-16">
                  <h1 className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4" data-aos="zoom-y-out">
                    Welcome to <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-400">Quizzle</span>
                  </h1>
                </div>
              </div>
            </div>
            {/* Section with Cards */}
            <section className="bg-gray-2 pb-10 pt-5 dark:bg-dark lg:pb-10 lg:pt-10">
              <div className="container">
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  <SingleQuizCard
                    image="https://i.ibb.co/r2zns1m/image-01.jpg"
                    CardTitle="50+ Best creative website themes & templates"
                    titleHref="/#"
                    btnHref="/#"
                    CardDescription="Lorem ipsum dolor sit amet pretium consectetur adipiscing elit. Lorem consectetur adipiscing elit."
                    Button="View Details"
                  />
                  <SingleQuizCard
                    image="https://i.ibb.co/0nbbWM9/image-02-1.jpg"
                    CardTitle="Creative Card Component designs graphic elements"
                    CardDescription="Lorem ipsum dolor sit amet pretium consectetur adipiscing elit. Lorem consectetur adipiscing elit."
                    Button="View Details"
                  />
                  <SingleQuizCard
                    image="https://i.ibb.co/dL9fH7N/image-03-1.jpg"
                    CardTitle="The ultimate UX and UI guide to card design"
                    CardDescription="Lorem ipsum dolor sit amet pretium consectetur adipiscing elit. Lorem consectetur adipiscing elit."
                    Button="View Details"
                  />
                </div>
              </div>
            </section>
      </div>
  )
}

export default Dashboard

// TO DO: Add this to the Dashboard component
//{/* Features section */}
{/* <div className="bg-white py-24 sm:py-32">
<div className="mx-auto max-w-7xl px-6 lg:px-8">
  <div className="mx-auto max-w-2xl lg:text-center">
    <h2 className="text-base font-semibold leading-7 text-indigo-600">Deploy faster</h2>
    <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
      Everything you need to deploy your app
    </p>
    <p className="mt-6 text-lg leading-8 text-gray-600">
      Quis tellus eget adipiscing convallis sit sit eget aliquet quis. Suspendisse eget egestas a elementum
      pulvinar et feugiat blandit at. In mi viverra elit nunc.
    </p>
  </div>
  <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
    <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
      {features.map((feature) => (
        <div key={feature.name} className="relative pl-16">
          <dt className="text-base font-semibold leading-7 text-gray-900">
            <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
              <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
            </div>
            {feature.name}
          </dt>
          <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
        </div>
      ))}
    </dl>
  </div>
</div>
</div> */}