/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useEffect, useState } from 'react';
import Layout from '../../src/Layout/Layout';
import Navbar from '../../src/Layout/Navbar';
import styles from '../../styles/Finance.module.css';
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useFormik } from 'formik';
import { Dialog, DialogContent, Menu, MenuItem } from '@material-ui/core';
import axios from 'axios';
import { isNull } from 'lodash';
import moment from 'moment';
import * as CurrencyFormat from 'react-currency-format';

const FinanceValue = {
    title: "",
    debit_amount: "",
    credit_amount: "",
    description: "",
    finance_account_id: ""
}

const Transaction: React.FunctionComponent<any> = () => {
    const router = useRouter();
    const [open, setOpen] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [isView, setIsView] = useState<boolean>(false);
    const [dataOnClick, setDataOnClick] = useState(null);
    // const [openAction, setOpenAction] = useState<boolean>(false);
    const [openDelete, setOpenDelete] = useState<boolean>(false);
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState<any>({
        page: 0,
        per_page: 5,
        sort_type: -1,
        sort_field: 'created_at'

    })
    const [anchorEl, setAnchorEl] = useState(null);
    const [dataDetail, setDataDetail] = useState(null);
    const [dataFinance, setDataFinance] = useState([]);

    const {
        handleSubmit,
        handleChange,
        values,
        // touched,
        // errors,
        // handleBlur,
        setFieldValue
    } = useFormik({
        initialValues: FinanceValue,
        // validationSchema: LoginValidation,
        onSubmit: async (val) => {
            const data = {
                title: val.title,
                debit_amount: parseInt(val.debit_amount),
                credit_amount: parseInt(val.debit_amount),
                description: val.description,
                finance_account_id: parseInt(val.finance_account_id)
            }

            if (isEdit) {
                const token = JSON.parse(localStorage.getItem('_token'));
                axios.put(`https://development.paper.id:3500/test-case/api/v1/finances/${dataOnClick.id}`, data, {
                    headers: {
                        Authorization: `Bearer ${token.token}`
                    }
                })
                    .then(() => {
                        alert('Update Success')
                        setOpen(false);
                        fetchData()

                    })
                    .catch(err => {
                        if (err.response.status === 401 || err.response.status === 400) {
                            localStorage.clear();
                            router.push('/login')
                        }

                        console.log(err);
                    })
            } else {
                const token = JSON.parse(localStorage.getItem('_token'));
                axios.post(`https://development.paper.id:3500/test-case/api/v1/finances`, data, {
                    headers: {
                        Authorization: `Bearer ${token.token}`
                    }
                })
                    .then(() => {
                        alert('Insert Success')
                        setOpen(false);
                        fetchData()

                    })
                    .catch(err => {
                        if (err.response.status === 401 || err.response.status === 400) {
                            localStorage.clear();
                            router.push('/login')
                        }

                        console.log(err);
                    })
            }
        }
    })

    const openDialog = (type: string): any => {
        if (type === 'delete') {
            setOpenDelete(true)
            setDataDetail(dataOnClick)
            setAnchorEl(false)

        }

        if (type === 'add') {
            setOpen(true)
            setAnchorEl(false)
            setFieldValue('title', '')
            setFieldValue('finance_account_id', '')
            setFieldValue('debit_amount', '')
            setFieldValue('credit_amount', '')
            setFieldValue('description', '')
        }

        if (type === 'edit') {
            setIsEdit(true);
            setIsView(false)
            setOpen(true)
            setAnchorEl(false)
            setFieldValue('title', dataOnClick.title)
            setFieldValue('finance_account_id', dataOnClick.finance_account_id)
            setFieldValue('debit_amount', dataOnClick.debit_amount)
            setFieldValue('credit_amount', dataOnClick.debit_amount)
            setFieldValue('description', dataOnClick.description)
        }


        if (type === 'view') {
            setIsView(true);
            setIsEdit(false)
            setOpen(true)
            setAnchorEl(false)
            setFieldValue('title', dataOnClick.title)
            setFieldValue('finance_account_id', dataOnClick.finance_account_id)
            setFieldValue('debit_amount', dataOnClick.debit_amount)
            setFieldValue('credit_amount', dataOnClick.debit_amount)
            setFieldValue('description', dataOnClick.description)
        }
    }

    const handleSearch = (e: { target: { value: any; }; }) => {
        if (e.target.value.length === 0) {
            setFilter({
                ...filter,
                page: 0,
                title: e.target.value,
                // description: e.target.value,
                // debit_amount: e.target.value,
                // credit_amount: e.target.value,
                // finance_account_type: e.target.value,
                // finance_account_name: e.target.value,
            })
        } else {
            setFilter({
                ...filter,
                title: e.target.value,
                // description: e.target.value,
                // debit_amount: e.target.value,
                // credit_amount: e.target.value,
                // finance_account_type: e.target.value,
                // finance_account_name: e.target.value,
            })
        }
    }

    const fetchFinanceAccount = useCallback(() => {
        const token = JSON.parse(localStorage.getItem('_token'));
        axios.get('https://development.paper.id:3500/test-case/api/v1/finance-accounts', {
            headers: {
                Authorization: `Bearer ${token.token}`
            }
        })
            .then(res => {
                setDataFinance(res.data.data)
            })
            .catch(err => {
                if (err.response.status === 401 || err.response.status === 400) {
                    localStorage.clear();
                    router.push('/login')
                }

                console.log(err);
            })
    }, [router])

    useEffect(() => {
        fetchFinanceAccount()
    }, [fetchFinanceAccount])


    const plus = () => {
        setFilter({
            ...filter,
            page: filter.page + 1
        })
    }
    const minus = () => {
        if (filter.page > 0) {
            setFilter({
                ...filter,
                page: filter.page - 1
            })
        }
    }

    const handleClose = () => {
        setAnchorEl(null);
    };

    const order = (name: string, ordered: number): any => {
        if (isNull(ordered)) {
            setFilter({
                ...filter,
                sort_field: name,
                sort_type: 1,
            })
        } else if (ordered === 1) {
            setFilter({
                ...filter,
                sort_field: name,
                sort_type: -1,
            })
        } else {
            setFilter({
                ...filter,
                sort_field: name,
                sort_type: 1,
            })
        }
    }


    const fetchData = useCallback(() => {
        const token = JSON.parse(localStorage.getItem('_token'));
        axios.get(`https://development.paper.id:3500/test-case/api/v1/finances`, {
            params: {
                ...filter
            },
            headers: {
                Authorization: `Bearer ${token.token}`
            }
        })
            .then(res => {
                setData(res.data.data)
            })
            .catch(err => {
                console.log(err);
            })
    }, [filter])

    useEffect(() => {
        fetchData()
    }, [fetchData])


    const handleClick = (event: { currentTarget: any; }, res: any) => {
        setAnchorEl(event.currentTarget);
        setDataOnClick(res)
    };


    const handleDelete = (id: number) => {
        const token = JSON.parse(localStorage.getItem('_token'));
        axios.delete(`https://development.paper.id:3500/test-case/api/v1/finances/${id}`, {
            headers: {
                Authorization: `Bearer ${token.token}`
            }
        })
            .then(() => {
                alert('Delete Success!')
                fetchData();
                setOpenDelete(false);
            })
            .catch(err => {
                if (err.response.status === 401 || err.response.status === 400) {
                    localStorage.clear();
                    router.push('/login')
                } else {
                    console.log(err);
                }
            })
    }

    return (
        <Layout>
            <Navbar />
            <div className={styles.menuFinance}>
                <Link href="/finance/account">
                    <a className={`${router?.pathname === '/finance/account' ? styles.activeMenu : ''}`}>
                        Account
                    </a>
                </Link>
                <Link href="/finance/transaction" >
                    <a className={`${router?.pathname === '/finance/transaction' ? styles.activeMenu : ''}`}>
                        Transaction
                    </a>
                </Link>
            </div>

            <div className={styles.content}>
                <h3>All Finance Account</h3>

                <div className="d-flex align-items-center justify-content-between mt-5  ">
                    <input type="text" className={styles.search} placeholder="Search" onChange={handleSearch} value={filter.name} />
                    <button onClick={() => openDialog('add')} className={styles.addButton}>Create New Account</button>
                </div>
            </div>

            <div className="row mt-5 mb-5">
                <div className="col-12">
                    <table className="myTable">
                        <thead>
                            <tr>
                                <th className="text-center" onClick={() => order('created_at', filter.sort_type)}>Transaction Date</th>
                                <th onClick={() => order('title', filter.sort_type)}>Finance Account</th>
                                <th onClick={() => order('finance_account_name', filter.sort_type)}>Finance Account Name</th>
                                <th onClick={() => order('finance_account_type', filter.sort_type)}>Reference</th>
                                <th onClick={() => order('debit_amount', filter.sort_type)}>Amount</th>
                                <th >Action</th>
                            </tr>
                            {/* <tr>
                                    <td colSpan={1}>
                                        <input type="text" className={styles.subSearch}/>
                                    </td>
                                </tr> */}
                        </thead>
                        <tbody>
                            {
                                data?.map((res, i) => {
                                    return (
                                        <tr key={i}>
                                            <td className="text-center">{moment(res.created_at).format('LLL')}</td>
                                            <td>{res.title}</td>
                                            <td>{res.finance_account_name}</td>
                                            <td>{res.finance_account_type}</td>
                                            <td><CurrencyFormat
                                                value={res.debit_amount}
                                                displayType={'text'}
                                                thousandSeparator="."
                                                decimalSeparator=","
                                                prefix={'Rp.'}
                                            />

                                            </td>
                                            <td>
                                                <button className={styles.actionButton} aria-controls="simple-menu" aria-haspopup="true" onClick={(e) => handleClick(e, res)}>
                                                    <span>Action</span>
                                                    <span>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                                                            <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                                                        </svg>
                                                    </span>
                                                </button>
                                                <Menu
                                                    // id="simple-menu"
                                                    anchorEl={anchorEl}
                                                    // keepMounted={false}
                                                    open={Boolean(anchorEl)}
                                                    onClose={handleClose}
                                                >
                                                    <MenuItem onClick={() => openDialog('view')} >
                                                        <span className="icon-menu">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
                                                                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                                                                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                                                            </svg>
                                                        </span>
                                                        <span>View</span>
                                                    </MenuItem>
                                                    <MenuItem onClick={() => openDialog('edit')}>
                                                        <span className="icon-menu">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                                                                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                                                            </svg>
                                                        </span>
                                                        <span>Edit</span>
                                                    </MenuItem>
                                                    <MenuItem onClick={() => openDialog('delete')}>
                                                        <span className="icon-menu">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                                                <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                                            </svg>
                                                        </span>
                                                        <span>Delete</span>
                                                    </MenuItem>
                                                </Menu>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <div className="row justify-content-center">
                    <div className="col-12">
                        <div className={styles.pagination}>
                            <span onClick={minus} className={styles.left}>{'<'}</span>
                            <span className={styles.page}>{filter.page + 1}</span>
                            <span onClick={plus} className={styles.right}>{'>'}</span>
                        </div>
                    </div>
                </div>
            </div>



            {/* Dialog add */}
            <Dialog
                classes={{ paper: styles.myDialog }}
                open={open}
                keepMounted
                onClose={() => setOpen(prevState => !prevState)}
                maxWidth="xl"
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogContent>
                    <div className="d-flex justify-content-end">
                        <span>X</span>
                    </div>

                    <div className="row">
                        <div className="col-12">
                            <label className={styles.labelFinance}>Finance</label>
                            <h2 className="label-create my-3">{isEdit ? 'Edit Finance' : (isView ? 'View Finance' : 'Add New Finance')}</h2>
                        </div>
                    </div>

                    <div className={styles.formAddFinance}>
                        <form onSubmit={handleSubmit}>
                            <div className="row mb-3">
                                <div className="col-12 mb-2">
                                    <label htmlFor="Finance Name">Finance Name*</label>
                                </div>
                                <div className="col-12">
                                    <input
                                        type="text"
                                        className="form-control input-custom"
                                        placeholder="input your finance name"
                                        name="title"
                                        value={values.title}
                                        onChange={handleChange}
                                        readOnly={isView ? true : false}
                                    />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-12 mb-2">
                                    <label htmlFor="Finance Name">Finance Account*</label>
                                </div>
                                <div className="col-12">
                                    <select
                                        className="form-control input-custom select-custom"
                                        name="finance_account_id"
                                        value={values.finance_account_id}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select Finance Account</option>
                                        {
                                            dataFinance?.map((res, i) => (
                                                <option key={i} value={res.id}>{res.name}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-12 mb-2">
                                    <label htmlFor="Finance Name">Amount*</label>
                                </div>
                                <div className="col-12">
                                    <input
                                        type="number"
                                        className="form-control input-custom"
                                        name="debit_amount"
                                        value={values.debit_amount}
                                        onChange={handleChange}
                                        readOnly={isView ? true : false}

                                    />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-12 mb-2">
                                    <label htmlFor="Finance Name">Desctiption</label>
                                </div>
                                <div className="col-12">
                                    <textarea
                                        className="form-control input-custom"
                                        name="description"
                                        value={values.description}
                                        onChange={handleChange}
                                        readOnly={isView ? true : false}
                                    />
                                </div>
                            </div>
                            <div className="row mb-3 justify-content-center">
                                <button type={isView ? "button" : "submit"} className={styles.buttonSave}>
                                    Simpan
                                </button>
                                <button type="button" onClick={() => setOpen(false)} className={styles.buttonCancel}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </DialogContent>
            </Dialog>


            {/* Open dialog delete */}

            <Dialog
                classes={{ paper: styles.myDialogDelete }}
                open={openDelete}
                keepMounted
                onClose={() => setOpenDelete(prevState => !prevState)}
                maxWidth="xl"
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogContent>
                    <div className="row mb-3 justify-content-center">
                        <div className="col-12">
                            <div className={styles.deleteSure}>
                                <h1>Delete {`${dataDetail?.title}`}</h1>
                                <p className="text-center"> Are you sure?</p>
                            </div>
                        </div>
                    </div>
                    <div className={`row mb-3 justify-content-center ${styles.deleteAction}`}>
                        <button onClick={() => handleDelete(dataDetail.id)} className={`${styles.buttonSave} ${styles.buttonDelete}`}  >
                            Simpan
                        </button>
                        <button onClick={() => setOpenDelete(prevState => !prevState)} className={`${styles.buttonCancel} ${styles.buttonDeleteCancel}`} >
                            Cancel
                        </button>
                    </div>
                </DialogContent>
            </Dialog>


        </Layout>
    );
};

export default Transaction;