import StoreItem from "./StoreItem"

export default function Store({ items }) {
  return (
    <section className="text-gray-700 body-font">
      <div className="container px-5 py-24 mx-auto">
        <h1 className="text-center mb-6" style={{color:'black',fontSize:'30px',fontWeight:'bold'}}>Our Product</h1>
        <div className="flex flex-wrap -m-4" >
          {items.map(item => (
            <StoreItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}
