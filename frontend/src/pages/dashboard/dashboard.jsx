import React, { useEffect, useState, useContext } from 'react';
import './dasboard.css';
import { UserContext } from '../../../context/userContext';
import SideNav from '../../components/SideNav/SideNav';
import TopNav from '../../components/Topnav/TopNav';
import money from '../../img/money.png';
import items from '../../img/items.png';
import outofstock from '../../img/outofstock.png';

function Dashboard() {
  const { user } = useContext(UserContext);
  console.log(user);

  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/products/get', {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((products) => {
        setData(products);
      });
  }, []);

  const totalCost = data.reduce((acc, item) => acc + item.price * item.amount, 0);
  const totalAmount = data.reduce((acc, item) => acc + item.amount, 0);
  const outOfStock = data.reduce((acc, item) => (item.amount < 40 ? acc + 1 : acc), 0);

  return (
    <div>
       <TopNav />
       <SideNav />
      {!!user && <h1>Hi {user.name}!</h1>}
      {/* Uncomment TopNav and SideNav if needed */}
     
      
      <div className="whole-dash-wrapper">
        <div className="dash-card row">
          {/* Total Items Card */}
          <div className="items cards card col-9 col-md-7 col-lg-3">
            <div className="dash-info">
              <div>
                <h1>{totalAmount}</h1>
                <p className="card-amt">Items in Stock</p>
              </div>
              <div>
                <img className="icons" src={items} alt="Items in Stock" />
              </div>
            </div>
          </div>

          {/* Total Cost Card */}
          <div className="items cards card col-9 col-md-7 col-lg-4">
            <div className="dash-info">
              <div>
                <h1>{totalCost} <span className="card-amt">Birr</span></h1>
                <p className="card-amt">Total Cost</p>
              </div>
              <div>
                <img className="icons" src={money} alt="Total Cost" />
              </div>
            </div>
          </div>

          {/* Out of Stock Card */}
          <div className="items cards card col-9 col-md-7 col-lg-3">
            <div className="dash-info">
              <div>
                <h1>{outOfStock} <span className="card-amt">Items</span></h1>
                <p className="card-amt">Out of Stock</p>
              </div>
              <div>
                <img className="icons" src={outofstock} alt="Out of Stock" />
              </div>
            </div>
          </div>
        </div>

        <hr />

        {/* Products Table */}
        <div className="table-wrapper">
          <h1>New Products</h1>
          <table className="summary-table items item-table custom-sm1 custom-md1">
            <thead className="table-head">
              <tr>
                <th>Product Name</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data.slice().reverse().map((item, index) => {
                const cardStatus = item.amount > 40 ? 'sufficient' : 'insufficient';
                return (
                  <tr key={index} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                    <td>{item.name}</td>
                    <td>{item.category}</td>
                    <td>{item.amount}</td>
                    <td>{item.price}</td>
                    <td><p className={cardStatus}>{cardStatus}</p></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

