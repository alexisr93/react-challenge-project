import React, { Component } from 'react';
import { Template } from '../../components';
import { SERVER_IP } from '../../private';
import './viewOrders.css';

const DELETE_ORDER_URL = `${SERVER_IP}/api/delete-order`

class ViewOrders extends Component {
    state = {
        orders: []
    }

    fetchOrders() {
        fetch(`${SERVER_IP}/api/current-orders`)
            .then(response => response.json())
            .then(response => {
                if(response.success) {
                    this.setState({ orders: response.orders });
                } else {
                    console.log('Error getting orders');
                }
            });
    }

    handleEdit(_id, _quantity, _order_item) {
        this.props.history.push({
          pathname: '/order',
          state: {
              id: _id,
              quantity: _quantity,
              order_item: _order_item,
          }
        });
    }

    handleDelete(_id) {
        fetch(DELETE_ORDER_URL, {
            method: 'POST',
            body: JSON.stringify({
                id: _id,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(response => {
              console.log("Success", JSON.stringify(response));
              this.fetchOrders();
            }
          )
        .catch(error => console.error(error));

    }

    componentDidMount() {
      this.fetchOrders();
    }

    render() {
        return (
            <Template>
                <div className="container-fluid">
                    {this.state.orders.map(order => {
                        const createdDate = new Date(order.createdAt);
                        return (
                            <div className="row view-order-container" key={order._id}>
                                <div className="col-md-4 view-order-left-col p-3">
                                    <h2>{order.order_item}</h2>
                                    <p>Ordered by: {order.ordered_by || ''}</p>
                                </div>
                                <div className="col-md-4 d-flex view-order-middle-col">
                                    <p>Order placed at {`${createdDate.getHours()}:${createdDate.getMinutes()}:${createdDate.getSeconds()}`}</p>
                                    <p>Quantity: {order.quantity}</p>
                                 </div>
                                 <div className="col-md-4 view-order-right-col">
                                     <button className="btn btn-success" onClick={() => this.handleEdit(order._id, order.quantity, order.order_item)}>Edit</button>
                                     <button className="btn btn-danger" onClick={() => this.handleDelete(order._id)}>Delete</button>
                                 </div>
                            </div>
                        );
                    })}
                </div>
            </Template>
        );
    }
}

export default ViewOrders;
