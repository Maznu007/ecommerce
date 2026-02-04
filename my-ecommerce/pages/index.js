
export default function Home() {
  return (
  <div className ="p-5">
    <div>
      <h2 className="text-2xl font-bold">Mobile</h2>
    <div className="w-64">
    <div className="bg-blue-100 p-5 rounded-xl">
      <img src="/products/iphone.png" alt="Mobile"/>
    </div>
    <div className="mt-2"> 
      <h3 className="font-bold text-lg">Iphone 14 pro</h3>
    </div>
    <p className="text-sm mt-1 leading-4">The latest iPhone with advanced features and a stunning display.iphone 14 pro max</p>
    <div className="flex mt-1">
      <div className="text-2xl font-bold grow">899$</div>
      <button className="bg-emerald-400 text-white py-1 px-3 rounded-xl">+</button>
    </div>
    </div>
    </div>
  </div>
  )
}
