import { useForm } from "@inertiajs/inertia-react";
import Form from "react-bootstrap/Form";
import React, { useState } from "react";
import Switch from "react-switchery-component";

export function CreatePackageModal({
    handleClose,
    shippers,
    cities,
    shippingMethods,
    isShipper,
    close,
}) {
    const [hasAccount, setHasAccount] = useState(false);
    const { data, setData, post, reset, errors } = useForm({
        ShipperId: undefined,
        ShipperName: undefined,
        ShipperPhoneNumber: undefined,
        ShipperAddress: undefined,
        ShipperEmail: undefined,
        ShipperCity: undefined,
        RecipientName: "",
        RecipientPhoneNumber: "",
        RecipientAddress: "",
        RecipientCity: -1,
        RecipientEmail: undefined,
        Reference: "",
        ShippingMethod: -1,
        AmountToCollect: 0,
        DeclaredValue: 0,
        Weight: 0,
        ProofDistributedObject: false,
        Fragile: false,
        ProductDescription: "",
        CheckPackage: false,
    });

    const onChange = (e) => setData({ ...data, [e.target.id]: e.target.value });
    // onChangeCheck
    const onChangeCheck = (e) =>
        setData({ ...data, [e.target.id]: JSON.parse(e.target.value) });
    const onChangeCheckPackage = (e) =>
        setData({ ...data, [e.target.id]: JSON.parse(e.target.checked) });

    const onSubmit = (e) => {
        e.preventDefault();
        if (!isShipper) {
            post(route("package.storeEm"), {
                data,
                onSuccess: () => {
                    reset(), close();
                },
            });
            return;
        }
        post(route("packages.store"), {
            data,
            onSuccess: () => {
                reset(), close();
            },
        });
    };
    return (
        <form onSubmit={onSubmit}>
            {/* <div className="modal-content"> */}
            <div className="modal-header">
                <h5 className="modal-title">Create</h5>
                <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={() => handleClose()}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#333333"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                    >
                        <path d="M16.24 14.83a1 1 0 0 1-1.41 1.41L12 13.41l-2.83 2.83a1 1 0 0 1-1.41-1.41L10.59 12 7.76 9.17a1 1 0 0 1 1.41-1.41L12 10.59l2.83-2.83a1 1 0 0 1 1.41 1.41L13.41 12l2.83 2.83z"></path>
                    </svg>
                </button>
            </div>
            <div className="modal-body">
                {!isShipper && (
                    <>
                        {" "}
                        <div className="form-row">
                            <div className="col-md-9 mt-3">
                                <h6>
                                    <i className="fas fa-user-tie mr-1"></i>{" "}
                                    Shipper Informations
                                </h6>
                            </div>
                            <div className="col-md-3  mt-3">
                                <Switch
                                    id="color-example"
                                    checked={hasAccount}
                                    onChange={() => setHasAccount(!hasAccount)}
                                />
                                <label htmlFor="color-example" className="px-3">
                                    <h6>Shipper has an account?</h6>
                                </label>
                            </div>
                        </div>
                        <div
                            id="ShipperSelectCR"
                            className="form-row"
                            style={{ display: !hasAccount ? " none" : null }}
                        >
                            <div className="col-md-4 mt-3">
                                <label htmlFor="ShipperListCR">
                                    Shipper Name: <i></i>
                                </label>
                                <Form.Select
                                    id="ShipperId"
                                    value={data.ShipperId}
                                    onChange={onChange}
                                    title="Select shipper name..."
                                    className=" form-control"
                                >
                                    <option></option>
                                    {shippers.map((it) => {
                                        return (
                                            <option value={it.id}>
                                                {it.UserName}
                                            </option>
                                        );
                                    })}
                                </Form.Select>{" "}
                                {errors && (
                                    <div className="text-danger mt-1">
                                        {errors.ShipperId}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div
                            id="ShipperInputCR"
                            className="form-row"
                            style={{ display: hasAccount ? " none" : null }}
                        >
                            <div className="col-md-4 mt-3">
                                <label htmlFor="ShipperName">
                                    Shipper Name: <i></i>
                                </label>
                                <input
                                    type="text"
                                    id="ShipperName"
                                    value={data.ShipperName}
                                    onChange={onChange}
                                    className="form-control"
                                    placeholder="Enter shipper name..."
                                />
                                {errors && (
                                    <div className="text-danger mt-1">
                                        {errors.ShipperName}
                                    </div>
                                )}
                            </div>
                            <div className="col-md-4 mt-3">
                                <label htmlFor="ShipperPhoneNumber">
                                    Shipper Phone Number: <i></i>
                                </label>
                                <input
                                    id="ShipperPhoneNumber"
                                    value={data.ShipperPhoneNumber}
                                    onChange={onChange}
                                    type="text"
                                    className="form-control"
                                    placeholder="+212661223344"
                                />
                                {errors && (
                                    <div className="text-danger mt-1">
                                        {errors.ShipperPhoneNumber}
                                    </div>
                                )}
                            </div>
                            <div className="col-md-4 mt-3">
                                <label htmlFor="ShipperAddress">
                                    Shipper Address: <i></i>
                                </label>
                                <input
                                    id="ShipperAddress"
                                    value={data.ShipperAddress}
                                    onChange={onChange}
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter shipper address..."
                                />
                                {errors && (
                                    <div className="text-danger mt-1">
                                        {errors.ShipperAddress}
                                    </div>
                                )}
                            </div>
                            <div className="col-md-4 mt-3">
                                <label htmlFor="ShipperCity">
                                    Shipper City: <i></i>
                                </label>
                                <Form.Select
                                    id="ShipperCity"
                                    value={data.ShipperCity}
                                    onChange={onChange}
                                    aria-label="Shipper City Select"
                                    className=" form-control"
                                >
                                    <option></option>
                                    {cities.map((it) => {
                                        return (
                                            <option value={it.id}>
                                                {it.localite}
                                            </option>
                                        );
                                    })}
                                </Form.Select>
                                {errors && (
                                    <div className="text-danger mt-1">
                                        {errors.ShipperCity}
                                    </div>
                                )}
                            </div>
                            <div className="col-md-4 mt-3">
                                <label htmlFor="ShipperEmail">
                                    Shipper Email: <i></i>
                                </label>
                                <input
                                    id="ShipperEmail"
                                    value={data.ShipperEmail}
                                    onChange={onChange}
                                    type="text"
                                    className="form-control"
                                    placeholder="name@domain.com"
                                />
                                {errors && (
                                    <div className="text-danger mt-1">
                                        {errors.ShipperEmail}
                                    </div>
                                )}
                            </div>
                        </div>
                    </>
                )}
                <div className="form-row">
                    <div className="col-md-12">
                        <h6>
                            <i className="fas fa-map-marker-alt mr-1 mt-4"></i>{" "}
                            Recipient Informations
                        </h6>
                    </div>
                </div>
                <div className="form-row">
                    <div className="col-md-4 mt-3">
                        <label htmlFor="RecipientName">
                            Recipient Name: <i></i>
                        </label>
                        <input
                            id="RecipientName"
                            value={data.RecipientName}
                            onChange={onChange}
                            type="text"
                            className="form-control"
                            placeholder="Enter recipient name..."
                        />
                        {errors && (
                            <div className="text-danger mt-1">
                                {errors.RecipientName}
                            </div>
                        )}
                    </div>
                    <div className="col-md-4 mt-3">
                        <label htmlFor="RecipientPhoneNumber">
                            Recipient Phone Number: <i></i>
                        </label>
                        <input
                            id="RecipientPhoneNumber"
                            value={data.RecipientPhoneNumber}
                            onChange={onChange}
                            type="text"
                            className="form-control"
                            placeholder="+212661223344"
                        />
                        {errors && (
                            <div className="text-danger mt-1">
                                {errors.RecipientPhoneNumber}
                            </div>
                        )}
                    </div>
                    <div className="col-md-4 mt-3">
                        <label htmlFor="RecipientAddress">
                            Recipient Address: <i></i>
                        </label>
                        <input
                            value={data.RecipientAddress}
                            onChange={onChange}
                            id="RecipientAddress"
                            type="text"
                            className="form-control"
                            placeholder="Enter recipient address..."
                        />
                        {errors && (
                            <div className="text-danger mt-1">
                                {errors.RecipientAddress}
                            </div>
                        )}
                    </div>
                </div>
                <div className="form-row">
                    <div className="col-md-4 mt-3">
                        <label htmlFor="RecipientCity">
                            Recipient City: <i></i>
                        </label>
                        <Form.Select
                            id="RecipientCity"
                            value={data.RecipientCity}
                            onChange={onChange}
                            aria-label="Recipient City Select"
                            className="form-control"
                            data-live-search="true"
                        >
                            <option></option>
                            {cities.map((it) => {
                                return (
                                    <option value={it.id}>{it.localite}</option>
                                );
                            })}
                        </Form.Select>
                        {errors && (
                            <div className="text-danger mt-1">
                                {errors.RecipientCity}
                            </div>
                        )}
                    </div>
                    <div className="col-md-4 mt-3">
                        <label htmlFor="RecipientEmail">
                            Recipient Email: <i></i>
                        </label>
                        <input
                            id="RecipientEmail"
                            value={data.RecipientEmail}
                            onChange={onChange}
                            type="text"
                            className="form-control"
                            placeholder="name@domain.com"
                        />
                        {errors && (
                            <div className="text-danger mt-1">
                                {errors.RecipientEmail}
                            </div>
                        )}
                    </div>
                </div>
                <div className="form-row mt-3">
                    <div className="col-md-12">
                        <h6>
                            <i className="fas fa-box mr-1 mt-4"></i> Package
                            Informations
                        </h6>
                    </div>
                </div>
                <div className="form-row">
                    <div className="col-md-3 mt-3">
                        <label htmlFor="Reference">
                            Reference: <i></i>
                        </label>
                        <input
                            value={data.Reference}
                            onChange={onChange}
                            id="Reference"
                            type="text"
                            className="form-control"
                            placeholder="Enter package reference..."
                        />
                        {errors && (
                            <div className="text-danger mt-1">
                                {errors.Reference}
                            </div>
                        )}
                    </div>
                    <div className="col-md-3 mt-3">
                        <label htmlFor="ShippingMethod">
                            Shipping Method: <i></i>
                        </label>
                        <Form.Select
                            id="ShippingMethod"
                            aria-label="Shipping Method Select"
                            value={data.ShippingMethod}
                            onChange={onChange}
                            className=" form-control"
                        >
                            <option></option>
                            {shippingMethods.map((it) => {
                                return (
                                    <option value={it.id}>
                                        {it.WorkflowName}
                                    </option>
                                );
                            })}
                        </Form.Select>
                        {errors && (
                            <div className="text-danger mt-1">
                                {errors.ShippingMethod}
                            </div>
                        )}
                    </div>
                    <div className="col-md-3 mt-3">
                        <label htmlFor="AmountToCollect">
                            Amount to be Collected (DH): <i></i>
                        </label>
                        <input
                            id="AmountToCollect"
                            value={data.AmountToCollect}
                            onChange={onChange}
                            type="number"
                            // min={0}
                            className="form-control"
                            placeholder="0.00"
                        />
                        {errors && (
                            <div className="text-danger mt-1">
                                {errors.AmountToCollect}
                            </div>
                        )}
                    </div>
                    <div className="col-md-3 mt-3">
                        <label htmlFor="DeclaredValue">
                            Declared Value (DH): <i></i>
                        </label>
                        <input
                            value={data.DeclaredValue}
                            onChange={onChange}
                            id="DeclaredValue"
                            type="number"
                            // min={0}
                            className="form-control"
                            placeholder="0.00"
                        />
                        {errors && (
                            <div className="text-danger mt-1">
                                {errors.DeclaredValue}
                            </div>
                        )}
                    </div>
                    <div className="col-md-3 mt-3">
                        <label htmlFor="ProofDistributedObject">
                            Proof Distributed Object: <i></i>
                        </label>
                        <Form.Select
                            id="ProofDistributedObject"
                            value={data.ProofDistributedObject}
                            onChange={onChangeCheck}
                            aria-label="ProofDistributedObject Select"
                            className="form-control"
                        >
                            <option value="false">NO</option>
                            <option value="true">YES</option>
                        </Form.Select>
                        {errors && (
                            <div className="text-danger mt-1">
                                {errors.ProofDistributedObject}
                            </div>
                        )}
                    </div>
                    <div className="col-md-3 mt-3">
                        <label htmlFor="Fragile">
                            Fragile: <i></i>
                        </label>
                        <Form.Select
                            id="Fragile"
                            value={data.Fragile}
                            onChange={onChangeCheck}
                            aria-label="Fragile Select"
                            className=" form-control"
                        >
                            <option value="false">NO</option>
                            <option value="true">YES</option>
                        </Form.Select>
                        {errors && (
                            <div className="text-danger mt-1">
                                {errors.Fragile}
                            </div>
                        )}
                    </div>
                    <div className="col-md-3 mt-3">
                        <label htmlFor="Weight">
                            Weight (KG): <i></i>
                        </label>
                        <input
                            id="Weight"
                            // min={0}
                            value={data.Weight}
                            onChange={onChange}
                            type="number"
                            className="form-control"
                            placeholder="1.2"
                        />
                        {errors && (
                            <div className="text-danger mt-1">
                                {errors.Weight}
                            </div>
                        )}
                    </div>
                    <div className="col-md-3 mt-3">
                        <label htmlFor="ProductDescription">
                            Product Description: <i></i>
                        </label>
                        <input
                            id="ProductDescription"
                            value={data.ProductDescription}
                            onChange={onChange}
                            type="text"
                            className="form-control"
                            placeholder="Enter product description..."
                        />
                        {errors && (
                            <div className="text-danger mt-1">
                                {errors.ProductDescription}
                            </div>
                        )}
                    </div>
                </div>
                <div className="form-row mt-4">
                    <div className="col-md-12">
                        <div className="custom-control custom-checkbox custom-checkbox-2 d-block mb-2">
                            <input
                                type="checkbox"
                                className="custom-control-input"
                                id="CheckPackage"
                                value={data.CheckPackage}
                                onChange={onChangeCheckPackage}
                            />
                            <label
                                className="custom-control-label"
                                htmlFor="CheckPackage"
                            >
                                Can the recipient check the package before
                                paying?
                            </label>
                            {errors && (
                                <div className="text-danger mt-1">
                                    {errors.CheckPackage}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal-footer">
                <button
                    id="CreatePackageConfirmation"
                    type="submit"
                    className="btn btn-success"
                >
                    Confirm
                </button>
                <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                >
                    Back
                </button>
            </div>
            {/* </div> */}
        </form>
    );
}
