import React, { useState, useContext } from 'react';
import {
  Form, Segment, Button, Header,
} from 'semantic-ui-react';
import axios from 'axios';
import { Datacontext } from '../context/context';
import { SaleMessage } from '../message';
axios.defaults.withCredentials = true
const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function AddSale() {
  const { saleAdder } = useContext(Datacontext).handlers;
  const [monthInfo, changeState] = useState({ index: 0, currentMonth: 'January' });
  const [monthData, getMonthData] = useState([]);
  const [otherInfo, getOtherInfo] = useState({});
  const [msg, setMsg] = useState({ success: undefined, error: undefined, msg: '' });
  const [buttonLoading,changeBtnLoadingState] = useState(false);
  
  function dataGetter(income) {
    const isExist = monthData.findIndex((month) => month.monthName === monthInfo.currentMonth);
    if (isExist === -1) {
      getMonthData([
        ...monthData,
        { monthName: monthInfo.currentMonth, income },
      ]);
    } else {
      monthData[isExist] = { monthName: monthInfo.currentMonth, income };
      getMonthData([
        ...monthData,
      ]);
    }
  }

  function monthChanger(e) {
    e.preventDefault();
    const income = Number(e.target.elements.saleMonth.value);
    const shopName = e.target.elements.shopName.value;
    const saleYear = e.target.elements.saleYear.value;
    const saleNote = e.target.elements.saleNote.value;
    getOtherInfo({
      ...otherInfo,
      shopName: shopName || otherInfo.shopName,
      saleYear: saleYear || otherInfo.saleYear,
      saleNote: saleNote || otherInfo.saleNote,
    });
    if (monthInfo.index < 11) {
      changeState({
        ...monthInfo,
        index: monthInfo.index += 1,
        currentMonth: month[monthInfo.index],
      });
      dataGetter(income);
    } else {
      changeState({
        ...monthInfo,
        index: 0,
        currentMonth: month[0],
      });
      dataGetter(income);
    }
    e.target.reset();
    e.target.elements.saleMonth.focus();
  }

  function saveData() {
    const allDatas = {
      shopIncomes: monthData,
      ...otherInfo,
    };
    changeBtnLoadingState(true)
    axios.post('/sale', {
      ...allDatas,
    })
      .then(({ data, status }) => {
        if (status === 201) {
          setMsg({
            ...msg,
            success: true,
            msg: data.success,
          });

          changeState({
            ...monthInfo,
            index: 0,
            currentMonth: 'January',
          });

          getOtherInfo({
            ...otherInfo,
            shopName: undefined,
            saleYear: undefined,
            saleNote: undefined,
          });
          getMonthData([]);
          saleAdder(data.sales);
          setTimeout(() => {
            setMsg({
              ...msg,
              success: undefined,
              msg: '',
            });
          }, 3000);
          changeBtnLoadingState(false);
        }
      })
      .catch(({ response }) => {
        const { error } = response.data;
        setMsg({
          ...msg,
          error: true,
          msg: error,
        });
        setTimeout(() => {
          setMsg({
            ...msg,
            error: undefined,
            msg: '',
          });
        }, 3000);
        changeBtnLoadingState(false);
      });
  }
  const { shopName, saleYear, saleNote } = otherInfo;
  const { currentMonth } = monthInfo;
  const isExistMonth = monthData.find((month) => month.monthName === currentMonth);
  return (
    <Segment padded="very" inverted>
      <Header as="h2">
        Add Your Sale Record
      </Header>
      { msg.msg
			&& (
<SaleMessage
  success={msg.success}
  error={msg.error}
  msg={msg.msg}
/>
			)}
      <Form inverted onSubmit={monthChanger}>
        <Form.Input
          name="shopName"
          type="text"
          label="Shop name"
          placeholder={shopName ? 'Update shop name' : ''}
          required={!shopName}
        />
        <Form.Input
          name="saleYear"
          type="text"
          label="Sale year"
          placeholder={saleYear ? 'Update sale year' : ''}
          required={!saleYear}
        />
        <Form.TextArea
          name="saleNote"
          placeholder={saleNote ? 'Update sale note' : ''}
          label="Describe the saling"
        />
        <Form.Input
          name="saleMonth"
          type="number"
          label={isExistMonth ? `Update income of ${currentMonth}` : `Add income of ${currentMonth}`}
          placeholder={`${currentMonth}'s sale`}
          required
        />
        <Button type="submit" primary>
          Add sale of
          {currentMonth}
        </Button>
      </Form>
      <br />
      <Button
        disabled={monthData.length < 1}
        type="button"
        onClick={saveData}
        loading={buttonLoading}
      >
        Save sale
      </Button>
    </Segment>
  );
}

export default AddSale;
