import { Link, useForm } from '@inertiajs/inertia-react'
import React from 'react'
import Auth from '../../Layouts/Auth'

export default function Login({ errors }) {
    const { data, setData, post } = useForm({
        email: '', password: '', remember: '',
    })

    const changeHandler = (e) => setData({ ...data, [e.target.id]: e.target.value })

    const submitHandler = (e) => {
        e.preventDefault()
        post(route('login'), data);
    }
    return (
        <>
            <div className="login-page">

                <div className="container">
                    <div className="panel">
                        <div className="row">
                            <form role="form" className="col-md-6" onSubmit={submitHandler} noValidate>

                                <div className="panel-body panel-form">

                                    <h1 className="form-title">Login</h1>

                                    <div className="form-group">
                                        <label htmlFor="">Email</label>

                                        <div className="input-group input-group-merged input-group-password-toggle">
                                            <input type="text" className="form-control" placeholder="Enter email here..." value={data.email} onChange={changeHandler} name='email' id='email' aria-label="Email" />
                                            <div className="input-group-append">
                                                <span className="input-group-text bg-white">
                                                    <i className="far fa-envelope"></i>
                                                </span>
                                            </div>
                                            {errors && (<div className='text-danger mt-1'>{errors.email}</div>)}
                                        </div>

                                    </div>


                                    <div className="form-group">
                                        <label htmlFor="">Password</label>

                                        <div className="input-group input-group-merged input-group-password-toggle">
                                            <input type="password" className="form-control" placeholder="Enter password here..." value={data.password} onChange={changeHandler} name='password' id='password' aria-label="Password" />
                                            <div className="input-group-append">
                                                <button className="btn btn-white btn-icon btn-password-toggle" type="button">
                                                    <svg className="icon-see" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M12.01 20c-5.065 0-9.586-4.211-12.01-8.424 2.418-4.103 6.943-7.576 12.01-7.576 5.135 0 9.635 3.453 11.999 7.564-2.241 4.43-6.726 8.436-11.999 8.436zm-10.842-8.416c.843 1.331 5.018 7.416 10.842 7.416 6.305 0 10.112-6.103 10.851-7.405-.772-1.198-4.606-6.595-10.851-6.595-6.116 0-10.025 5.355-10.842 6.584zm10.832-4.584c2.76 0 5 2.24 5 5s-2.24 5-5 5-5-2.24-5-5 2.24-5 5-5zm0 1c2.208 0 4 1.792 4 4s-1.792 4-4 4-4-1.792-4-4 1.792-4 4-4z" /></svg>
                                                    <svg className="icon-hide" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M8.137 15.147c-.71-.857-1.146-1.947-1.146-3.147 0-2.76 2.241-5 5-5 1.201 0 2.291.435 3.148 1.145l1.897-1.897c-1.441-.738-3.122-1.248-5.035-1.248-6.115 0-10.025 5.355-10.842 6.584.529.834 2.379 3.527 5.113 5.428l1.865-1.865zm6.294-6.294c-.673-.53-1.515-.853-2.44-.853-2.207 0-4 1.792-4 4 0 .923.324 1.765.854 2.439l5.586-5.586zm7.56-6.146l-19.292 19.293-.708-.707 3.548-3.548c-2.298-1.612-4.234-3.885-5.548-6.169 2.418-4.103 6.943-7.576 12.01-7.576 2.065 0 4.021.566 5.782 1.501l3.501-3.501.707.707zm-2.465 3.879l-.734.734c2.236 1.619 3.628 3.604 4.061 4.274-.739 1.303-4.546 7.406-10.852 7.406-1.425 0-2.749-.368-3.951-.938l-.748.748c1.475.742 3.057 1.19 4.699 1.19 5.274 0 9.758-4.006 11.999-8.436-1.087-1.891-2.63-3.637-4.474-4.978zm-3.535 5.414c0-.554-.113-1.082-.317-1.562l.734-.734c.361.69.583 1.464.583 2.296 0 2.759-2.24 5-5 5-.832 0-1.604-.223-2.295-.583l.734-.735c.48.204 1.007.318 1.561.318 2.208 0 4-1.792 4-4z" /></svg>
                                                </button>
                                            </div>
                                        </div>
                                        {errors && (<div className='text-danger mt-1'>{errors.password}</div>)}

                                    </div>


                                    <div className="form-group">
                                        <a href="#">Forgot your password?</a>
                                    </div>


                                    <div className="form-group form-group-btns text-center">
                                        <div className="row no-gutters">
                                            <div className="col-md-6">
                                                <button type="submit" className="btn btn-block btn-lg btn-rounded btn-primary sharp-top-right" >
                                                    Sign In</button>
                                            </div>
                                            {/* <div className="col-md-6">
                                                <button type="button" className="btn btn-block btn-lg btn-rounded btn-secondary sharp-top-left">Back</button>
                                            </div> */}
                                        </div>
                                    </div>


                                    <div className="form-group text-center">
                                        Don't have an account? {' '}
                                        <Link href={route('register')} className="text-danger font-weight-600">Sign up</Link>
                                    </div>

                                </div>

                            </form>

                            <div className="col-md-6">

                                <div className="panel-body panel-image" style={{ backgroundImage: "url('/assets/auth/tim-bennett-OwvRB-M3GwE-unsplash-h500.jpg')" }}>

                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

Login.layout = (page) => <Auth children={page} title={"Login"} />


{/* <div className="page-header min-vh-100">
<div className="container">
    <div className="row">
        <div className="col-xl-4 col-lg-5 col-md-7 d-flex flex-column mx-lg-0 mx-auto">
            <div className="card card-plain">
                <div className="card z-index-0">
                    <div className="card-header text-center pt-4">
                        <h5>Register with</h5>
                    </div>
                    <div className="row px-xl-5 px-sm-4 px-3 d-flex justify-content-center">
                        <div className="col-12 px-1 inline-block">
                            <a className="btn btn-outline-light w-100 inline-block" href={route('auth.google')} >
                                <svg width="24px" height="32px" viewBox="0 0 64 64" version="1.1">
                                    <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                                        <path d="M29.4960833,58.9921667 C37.4599129,58.9921667 44.1456164,56.3701671 49.0290201,51.8475849 L39.7213169,44.6372555 C37.2305867,46.3742596 33.887622,47.5868638 29.4960833,47.5868638 C21.6960582,47.5868638 15.0758763,42.4415991 12.7159637,35.3297782 L12.3700541,35.3591501 L3.26524241,42.4054492 L3.14617358,42.736447 C7.9965904,52.3717589 17.959737,58.9921667 29.4960833,58.9921667" fill="#34A853" />
                                        <path d="M12.7159637,35.3297782 C12.0932812,33.4944915 11.7329116,31.5279353 11.7329116,29.4960833 C11.7329116,27.4640054 12.0932812,25.4976752 12.6832029,23.6623884 L12.6667095,23.2715173 L3.44779955,16.1120237 L3.14617358,16.2554937 C1.14708246,20.2539019 0,24.7439491 0,29.4960833 C0,34.2482175 1.14708246,38.7380388 3.14617358,42.736447 L12.7159637,35.3297782" fill="#FBBC05" />
                                        <path d="M29.4960833,11.4050769 C35.0347044,11.4050769 38.7707997,13.7975244 40.9011602,15.7968415 L49.2255853,7.66898166 C44.1130815,2.91684746 37.4599129,0 29.4960833,0 C17.959737,0 7.9965904,6.62018183 3.14617358,16.2554937 L12.6832029,23.6623884 C15.0758763,16.5505675 21.6960582,11.4050769 29.4960833,11.4050769" fill="#EB4335" />
                                    </g>
                                </svg>
                                &nbsp;&nbsp;
                                <span className='fw-bold text-dark'>Sign In with Google</span>
                            </a>
                        </div>
                        <div className="mt-2 position-relative text-center">
                            <p className="text-sm font-weight-bold mb-2 text-secondary text-border d-inline z-index-2 bg-white px-3">
                                or
                            </p>
                        </div>
                    </div>
                    <div className="card-body">
                        <form role="form" onSubmit={submitHandler} noValidate>
                            <div className="mb-3">
                                <input value={data.email} onChange={changeHandler} type="email" name='email' id='email' className="form-control form-control-lg" placeholder="Email" aria-label="Email" />
                                {errors && (<div className='text-danger mt-1'>{errors.email}</div>)}
                            </div>
                            <div className="mb-3">
                                <input value={data.password} onChange={changeHandler} type="password" name='password' id='password' className="form-control form-control-lg" placeholder="Password" aria-label="Password" />
                                {errors && (<div className='text-danger mt-1'>{errors.password}</div>)}

                            </div>
                            <div className="form-check form-switch">
                                <input value={data.remember} onChange={(e) => setData({ ...values, remember: e.target.checked })} name='remember' id='remember' className="form-check-input" type="checkbox" id="rememberMe" />
                                <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                            </div>
                            <div className="text-center">
                                <button type="submit" className="btn btn-lg btn-primary btn-lg w-100 mt-4 mb-0">Sign in</button>
                            </div>
                        </form>
                    </div>
                    <div className="card-footer text-center pt-0 px-lg-2 px-1">
                        <p className="mb-4 text-sm mx-auto">
                            Don't have an account? {' '}
                            <Link href={route('register')} className="text-primary text-gradient font-weight-bold">Sign up</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div className="col-6 d-lg-flex d-none h-100 my-auto pe-0 position-absolute top-0 end-0 text-center justify-content-center flex-column">
            <div className="position-relative bg-gradient-primary h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center overflow-hidden" style={{ backgroundImage: 'url("https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signin-ill.jpg")', backgroundSize: 'cover' }}>
                <span className="mask bg-gradient-primary opacity-6" />
                <h4 className="mt-5 text-white font-weight-bolder position-relative">"Attention is the new currency"</h4>
                <p className="text-white position-relative">The more effortless the writing looks, the more effort the writer actually put into the process.</p>
            </div>
        </div>
    </div>
</div>
</div> */}