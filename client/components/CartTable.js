import React from 'react'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'

const CartTable = props => {
  // let userOrGuestCart = props.cart && props.cart[0] && props.cart[0].products ? props.cart[0].products :
  let currCart =
    props.cart && props.cart[0] && props.cart[0].products
      ? props.cart[0].products
      : props.cart
  const totalPrice = currCart.reduce((sum, product) => {
    return sum + product.price * product.orderitems.quantity
  }, 0)
  console.log('CurrCar IS', currCart, 'TOTAL PRICE IS', totalPrice)
  return currCart.length ? (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>Price</th>
            <th>Remove Item</th>
          </tr>
        </thead>
        <tbody>
          {currCart[0] ? (
            currCart.map((product, index) => (
              <tr key={product.id}>
                <td>{index + 1}</td>
                <td>{product.name}</td>
                <td>
                  <button type="submit" onClick={() => props.decrease(product)}>
                    -
                  </button>
                  {` ${product.orderitems.quantity} `}
                  <button type="submit" onClick={() => props.increase(product)}>
                    +
                  </button>
                </td>
                <td>${(product.price / 100).toFixed(2)}</td>
                <td>{`$${(
                  product.orderitems.quantity *
                  product.price /
                  100
                ).toFixed(2)}`}</td>
                <td>
                  <Button
                    variant="danger"
                    type="submit"
                    onClick={() => props.remove(product)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <Table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Remove Item</th>
                </tr>
              </thead>
            </Table>
          )}
          <tr>
            <td>
              <b>TOTAL PRICE</b>
            </td>{' '}
            <td />
            <td />
            <td />
            <td>
              <b>${(totalPrice / 100).toFixed(2)}</b>
            </td>
            <td />
          </tr>
        </tbody>
      </Table>
      {/* <Button
        variant="primary"
        type="submit"
        onClick={e => props.handleSubmit(e, totalPrice)}
      >
        Checkout
      </Button> */}
    </div>
  ) : (
    <div>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Remove Item</th>
          </tr>
        </thead>
      </Table>
      <img src="/don.png" width="70%" height="45%" />
    </div>
  )
}

export default CartTable
