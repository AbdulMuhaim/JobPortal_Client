
const callouts = [
    {
        name: 'Civil Engineer',
        description: 'Journals and note-taking',
        imageSrc: 'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/3GgkKundG6WGpPHOPFBdDq/7cba9177de38af6c6fd9f30b7d377a91/Construction-workers-and-architect-looking-at-blueprints-on-construction-site-514311930_5413x3609__1_.jpeg?w=1500&h=680&q=60&fit=fill&f=faces&fm=jpg&fl=progressive&auto=format%2Ccompress&dpr=1&w=1000&h=',
        imageAlt: 'Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.',
        href: '#',
      },
    {
      name: 'Software Engineer',
      description: 'Work from home accessories',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-01.jpg',
      imageAlt: 'Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.',
      href: '#',
    },
    {
      name: 'Physician Assistant',
      description: 'Daily commute essentials',
      imageSrc: 'https://www.practicematch.com/sharedfiles/Articles/benefits-of-physicians-assistants.jpg',
      imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
      href: '#',
    },
    {
        name: 'UI Designer',
        description: 'Work from home accessories',
        imageSrc: 'https://www.upgrad.com/bootcamps/ui-ux-bootcamp/images/banner.jpg',
        imageAlt: 'Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.',
        href: '#',
      },
      {
        name: 'Photographer',
        description: 'Journals and note-taking',
        imageSrc: 'https://jdinstitute.co/wp-content/uploads/2020/11/14-Become-A-Professional-Photographer.jpeg',
        imageAlt: 'Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.',
        href: '#',
      },
      {
        name: 'Sales Executive',
        description: 'Daily commute essentials',
        imageSrc: 'https://media.graphassets.com/resize=fit:crop,width:1280,height:660/qtntZjgnSDKsGFm9Slnd',
        imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
        href: '#',
      },
  ]
  
  export default function Example() {
    return (
      <div className="bg-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
            <h2 className="text-2xl font-bold text-gray-900">Most Searched Jobs</h2>
  
            <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-1 lg:space-y-0">
              {callouts.map((callout) => (
                <div key={callout.name} className="group relative">
                  <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                    <img
                      src={callout.imageSrc}
                      alt={callout.imageAlt}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <h1 className="mt-6 text-sm text-gray-700">
                    <a href={callout.href}>
                      <span className="absolute inset-0"/>
                      {callout.name}
                    </a>
                  </h1>
                  <p className="text-base font-semibold text-gray-900">{callout.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
  