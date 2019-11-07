import React from 'react'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'

const CartTable = props => {
  return props.cart && props.cart[0] && props.cart[0].products ? (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Product</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Remove Item</th>
        </tr>
      </thead>
      <tbody>
        {props.cart[0].products.map((product, index) => (
          <tr key={product.id}>
            <td>{index + 1}</td>
            <td>{product.name}</td>
            <td>
              <button
                type="submit"
                onClick={() => props.decrease(product.orderitems)}
              >
                {' '}
                -{' '}
              </button>
              {` ${product.orderitems.quantity} `}
              <button
                type="submit"
                onClick={() => props.increase(product.orderitems)}
              >
                {' '}
                +{' '}
              </button>
              {/* <input
                name="quantity"
                type="text"
                value={product.orderitems.quantity}
                onChange={props.handleChange}
              /> */}
            </td>
            <td>{`$${product.orderitems.quantity * product.price / 100}`}</td>
            <td>
              <Button variant="danger" type="submit">
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  ) : null
}

export default CartTable
