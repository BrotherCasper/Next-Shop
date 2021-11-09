import Head from 'next/head';
import {Title} from "../components/Title";
import {getProducts} from "../lib/products";
import {useEffect, useState} from "react";

//The example below how you can implement incremental generation at build time which can then be updated at a later time
// export async function getStaticProps(){
//     const products = await getProducts();
//     return {
//         props:{
//             products:products
//         },
//         revalidate:30 // Seconds <= This specifies that the data must be treated as stale every 30 seconds
//     }
// }

//The below function causes the get products call to run every time the page is loaded keeping the data fresh
// This happens at run time just before the page is served to the user.
// export async function getServerSideProps(){
//     const products = await getProducts();
//     return {
//         props:{
//             products:products
//         },
//     }
// }

export default function Home() {

    // Useful for client side rendering

    // const [products,setProducts]=useState([])
    // useEffect(()=> {
    //     getProducts().then(setProducts)
    // },[])


    // Useful for client side rendering

    const [products,setProducts]=useState([]);
    useEffect(()=> {
         (async () => {
            const response = await fetch('/api/products')
            const products = await response.json();
            setProducts(products)
        })();
        getProducts().then(setProducts)
    },[]);
  return (
   <>
   <Head>
     <title> Next Shop</title>
   </Head>
     <main className="px-8 py-4">
         <Title>Next Shop</Title>
         <ul>
             {products.map((product => (
             <li key={product.id}>
                 {product.title}
             </li>
             )))}
         </ul>
     </main>

   </>
  )
}
