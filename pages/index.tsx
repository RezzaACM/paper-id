import axios from 'axios'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import Layout from '../src/Layout/Layout'
import Navbar from '../src/Layout/Navbar'
import Avatar from '@material-ui/core/Avatar';

const Home: React.FunctionComponent = () => {
  const [accounts, setAccounts] = useState([]);
  const router = useRouter()

  const fetchAccount = useCallback(() => {
    const token = JSON.parse(localStorage.getItem('_token'));
    axios.get(`https://development.paper.id:3500/test-case/api/v1/finance-accounts?sort_field=created_at&sort_type=1&page=0&per_page=5`, {
      headers: {
        Authorization: `Bearer ${token.token}`
      }
    })
      .then(res => {
        setAccounts(res.data.data)
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
    fetchAccount()
  }, [fetchAccount])

  return (
    <Layout>
      <Navbar header="Dashboard" />

      <div className="row mt-3">
        <div className="col-6">
          <div className="row">
            <div className="col-12">
              <h4 className="dashboard-name">Transaction Summary</h4>
            </div>
          </div>
        </div>

        <div className="col-6">

          <div className="row">
            <div className="col-12">
              <h4 className="dashboard-name">Finance Account</h4>
            </div>
          </div>

          <div className="row">
            {
              accounts.map((res, i) => {

                return (
                  <div className="col-6 mt-2" key={i}>
                    <div className="box-account">
                      <div className="box-account-avatar">
                        <Avatar alt={res.name} src="/broken.jpg" className={'avatar'} ></Avatar>
                      </div>
                      <div className="box-account-name">
                        <label className="name">{res.name} - <span>{res.type}</span></label> <br />
                        <label className="type">{res.Description}</label>
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div>

        </div>
      </div>
    </Layout>
  )
}

export default Home;