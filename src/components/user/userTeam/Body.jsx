const people = [
    {
        name:'Abdul Muhaim',
        role: 'Co-Founder / CEO',
        imageUrl:"https://i.pinimg.com/564x/82/b8/9e/82b89ee17934b1e4f7bdfd24b3100fef.jpg"
    },
    {
      name: 'Leslie Alexander',
      role: 'Co-Founder / CTO',
      imageUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        name:'Jone Jones',
        role: 'Business Relations',
        imageUrl:"https://i.guim.co.uk/img/media/cd538e914d6e9f49b8a8d3941af7dc52cfe634d0/0_0_3689_2214/master/3689.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=a1e2fd955ab7ebedcf7117f879c86f78"
    },
    {
        name:'Alia Bhatt',
        role: 'Front-end Developer',
        imageUrl:"https://www.instyle.com/thmb/UKFx87vh4vv2NFXXJpXNbAWGUlQ=/1500x0/filters:no_upscale():max_bytes(200000):strip_icc()/072523-Alia-Bhatt-Small-Talk-recirc-f10534bb2898449c97afb17931810f06.jpg"
    },
    {
        name:'Tamanna Bhatia',
        role: 'Designer',
        imageUrl:"https://www.breezemasti.com/wp-content/uploads/Tamannah-Bhatia-age-wiki-family-husband-net-worth-movies.jpg"
    },
    {
        name:'Sundar Pichai',
        role: 'Director of Product',
        imageUrl:"https://images.news18.com/ibnlive/uploads/2023/01/sundar-pichai.png"
    }



    
   
    // More people...
  ]
  
  export default function Example() {
    return (
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Meet the faces behind MYJOB</h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
            At MYJOB, we take pride in the dedicated and passionate individuals who make up our team. Our team is comprised of professionals from diverse backgrounds, each bringing a unique set of skills and expertise to the table. Together, we are committed to providing you with the best possible job-seeking experience.
            </p>
          </div>
          <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
            {people.map((person) => (
              <li key={person.name}>
                <div className="flex items-center gap-x-6">
                  <img className="h-16 w-16 rounded-full" src={person.imageUrl} alt="" />
                  <div>
                    <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">{person.name}</h3>
                    <p className="text-sm font-semibold leading-6 text-indigo-600">{person.role}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
  