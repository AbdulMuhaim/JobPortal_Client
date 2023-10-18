 import image from '../../images/employHome.jpg'
  import imag from '../../images/PngItem_6631012.png'

  
  export default function Example() {
    return (
      <div className="bg-white">
        <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
          <img src={image} alt=""/>
          <img src={imag} alt="" />
        </div>
      </div>
    )
  }
  