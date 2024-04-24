import React, { useEffect, useState } from 'react'

function Main() {
  const [product, setProduct] = useState([])

  function FetchData() {
    fetch('../../product.json')
      .then(res => res.json())
      .then(product => {
        setProduct(product)
      })
  }
  useEffect(() => {
    FetchData()
  }, [])
  return (
    <div className='d-flex flex-wrap'>
      {
        product.map((data) => (
          <div className='card d-flex flex-wrap mt-1 ms-1' style={{width : '240px'}}>
            <div className='card-header'>{data.name}</div>
            <div className='card-body'><img src={data.image} width='100' alt="" />
            {
              data.productDetails && (
                <>
                  <p>Closure type : {data.productDetails['Closure type']}</p>
                  <p>Heel type : {data.productDetails['Heel type']}</p>
                  <p>Level : {data.productDetails[' level ']}</p>
                  <p>Country of origin : {data.productDetails["Country of Origin"]}</p>
                  <p>Sole type : {data.productDetails['Sole material']}</p>
                </>
              )
            }
            </div>
            <div className='card-footer'>
              <p>{data.price}</p>
              <button className='btn btn-danger w-100'>Buynow</button>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default Main