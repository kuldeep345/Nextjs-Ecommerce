import Head from 'next/head'
import ProductCard from '../components/ProductCard'
import baseUrl from '../helpers/baseUrl'


const Home = ({ products }) => {

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4 gap-10 justify-evenly">
            {
              products.map((item, i) => (
                <ProductCard key={item._id} id={item._id} name={item.name} mediaUrl={item.mediaUrl} price={item.price} description={item.description} />
              ))
            }
          </div>
        </div>
      </section>
    </div>
  )
}

export async function getStaticProps() {
  const res = await fetch(`${baseUrl}/api/products`)
  const data = await res.json()

  return {
    props: {
      products: data
    }
  }
}



export default Home