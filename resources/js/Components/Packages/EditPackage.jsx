import { useForm } from "@inertiajs/inertia-react";
import Form from "react-bootstrap/Form";
import React, { useEffect, useState } from "react";
import Switch from "react-switchery-component";
import { SelectSingle } from "../Filters/Index";

export function EditPackageModale({
    packageCurrent,
    shippers,
    cities,
    shippingMethods,
    isShipper,
    close,
}) {
    const [hasAccount, setHasAccount] = useState(packageCurrent.ShipperID);
    const { data, setData, patch, reset, errors } = useForm({
        // ...packageCurrent,
        ShipperPhoneNumber: packageCurrent?.ShipperPhone,
        ShipperId: packageCurrent.ShipperID ?? undefined,
        CustomerName: packageCurrent.CustomerName,
        CustomerPhone: packageCurrent.CustomerPhone,
        CustomerAddress: packageCurrent.CustomerAddress,
        CustomerCity: packageCurrent.CustomerCity,
        CustomerEmail: packageCurrent.CustomerEmail ?? undefined,
        ShipperCity: !packageCurrent.ShipperID
            ? packageCurrent.ShipperCity
            : undefined,
        ShipperName: !packageCurrent.ShipperID
            ? packageCurrent.ShipperName
            : undefined,
        ShipperPhoneNumber: !packageCurrent.ShipperID
            ? packageCurrent.ShipperPhone
            : undefined,
        ShipperAddress: !packageCurrent.ShipperID
            ? packageCurrent.ShipperAddress
            : undefined,
        ShipperEmail: !packageCurrent.ShipperID
            ? packageCurrent.ShipperEmail
            : undefined,
        Reference: packageCurrent.Reference,
        ShippingMethod: packageCurrent.ShippingMethod,
        AmountToCollect: packageCurrent.AmountToCollect,
        DeclaredValue: packageCurrent.DeclaredValue,
        ProofDistributedObject: packageCurrent.ProofDistributedObject,
        Fragile: packageCurrent.Fragile,
        Weight: packageCurrent.Weight,
        ProductDescription: packageCurrent.ProductDescription,
        CheckPackage: packageCurrent.CheckPackage,
        CustomerCin: packageCurrent.CustomerCin,
        ShipperCin: packageCurrent.ShipperCin,
    });

    const onChange = (e) => setData({ ...data, [e.target.id]: e.target.value });
    const onChangeId = (id, value) => setData({ ...data, [id]: value });

    // onChangeCheck
    const onChangeCheck = (e) =>
        setData({ ...data, [e.target.id]: JSON.parse(e.target.value) });

    const onSubmit = (e) => {
        e.preventDefault();
        if (!isShipper) {
            patch(
                route("package.updateEm", {
                    package: packageCurrent.id,
                }),
                {
                    data,
                    onSuccess: () => {
                        reset(), close();
                    },
                }
            );
            return;
        }
        patch(
            route("packages.update", {
                package: packageCurrent.id,
            }),
            {
                data,
                onSuccess: () => {
                    reset(), close();
                },
            }
        );
    };
    const shippingMethod = shippingMethods.filter((it) => {
        return it.WorkflowName.startsWith("Forward");
    });

    return (
        <form onSubmit={onSubmit}>
            {/* <div className="modal-content"> */}
            <div className="modal-header">
                <h5 className="modal-title">Package Edit</h5>
                <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={() => close()}
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
            {/* {JSON.} */}
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
                                <SelectSingle
                                    id={"ShipperId"}
                                    title="Select shipper name..."
                                    onChange={(v) => {
                                        onChangeId("ShipperCity", v);
                                    }}
                                    value={data.ShipperId}
                                    data={shippers.map((it) => {
                                        return {
                                            value: it.id,
                                            label: it.UserName,
                                        };
                                    })}
                                />
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
                                <SelectSingle
                                    value={data.ShipperCity}
                                    id={"ShipperCity"}
                                    title="Shipper City Select"
                                    onChange={(v) => {
                                        onChangeId("ShipperCity", v);
                                    }}
                                    data={cities.map((it) => {
                                        return {
                                            value: it.id,
                                            label: it.localite,
                                        };
                                    })}
                                />
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
                            <div className="col-md-4 mt-3">
                                <label htmlFor="ShipperCin">
                                    Shipper Cin: <i></i>
                                </label>
                                <input
                                    id="ShipperCin"
                                    value={data.ShipperCin}
                                    onChange={onChange}
                                    type="text"
                                    className="form-control"
                                    placeholder="K*****"
                                />
                                {errors && (
                                    <div className="text-danger mt-1">
                                        {errors.ShipperCin}
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
                            Customer Informations
                        </h6>
                    </div>
                </div>
                <div className="form-row">
                    <div className="col-md-4 mt-3">
                        <label htmlFor="CustomerName">
                            Customer Name: <i></i>
                        </label>
                        <input
                            id="CustomerName"
                            value={data.CustomerName}
                            onChange={onChange}
                            type="text"
                            className="form-control"
                            placeholder="Enter Customer name..."
                        />
                        {errors && (
                            <div className="text-danger mt-1">
                                {errors.CustomerName}
                            </div>
                        )}
                    </div>
                    <div className="col-md-4 mt-3">
                        <label htmlFor="CustomerPhone">
                            Customer Phone Number: <i></i>
                        </label>
                        <input
                            id="CustomerPhone"
                            value={data.CustomerPhone}
                            onChange={onChange}
                            type="text"
                            className="form-control"
                            placeholder="+212661223344"
                        />
                        {errors && (
                            <div className="text-danger mt-1">
                                {errors.CustomerPhone}
                            </div>
                        )}
                    </div>
                    <div className="col-md-4 mt-3">
                        <label htmlFor="CustomerAddress">
                            Customer Address: <i></i>
                        </label>
                        <input
                            value={data.CustomerAddress}
                            onChange={onChange}
                            id="CustomerAddress"
                            type="text"
                            className="form-control"
                            placeholder="Enter Customer address..."
                        />
                        {errors && (
                            <div className="text-danger mt-1">
                                {errors.CustomerAddress}
                            </div>
                        )}
                    </div>
                </div>
                <div className="form-row">
                    <div className="col-md-4 mt-3">
                        <label htmlFor="CustomerCity">
                            Customer City: <i></i>
                        </label>
                        <SelectSingle
                            value={data.CustomerCity}
                            id={"RecipientCity"}
                            title="Customer City Select"
                            onChange={(v) => {
                                onChangeId("RecipientCity", v);
                            }}
                            data={cities.map((it) => {
                                return { value: it.id, label: it.localite };
                            })}
                        />
                        {errors && (
                            <div className="text-danger mt-1">
                                {errors.CustomerCity}
                            </div>
                        )}
                    </div>
                    <div className="col-md-4 mt-3">
                        <label htmlFor="CustomerEmail">
                            Customer Email: <i></i>
                        </label>
                        <input
                            id="CustomerEmail"
                            value={data.CustomerEmail}
                            onChange={onChange}
                            type="text"
                            className="form-control"
                            placeholder="name@domain.com"
                        />
                        {errors && (
                            <div className="text-danger mt-1">
                                {errors.CustomerEmail}
                            </div>
                        )}
                    </div>
                    <div className="col-md-4 mt-3">
                        <label htmlFor="CustomerCin">
                            Recipient Cin: <i></i>
                        </label>
                        <input
                            id="CustomerCin"
                            value={data.CustomerCin}
                            onChange={onChange}
                            type="text"
                            className="form-control"
                            placeholder="K****"
                        />
                        {errors && (
                            <div className="text-danger mt-1">
                                {errors.CustomerCin}
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

                        <SelectSingle
                            id={"ShippingMethod"}
                            title="Shipping Method Select"
                            onChange={(v) => {
                                onChangeId("ShippingMethod", v);
                            }}
                            value={data.ShippingMethod}
                            data={shippingMethod.map((it) => {
                                return {
                                    value: it.id,
                                    label: it.WorkflowName,
                                };
                            })}
                        />
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
                            // type="number"
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
                            // type="number"
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
                            // type="number"
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
                                checked={data.CheckPackage}
                                value={data.CheckPackage}
                                onChange={onChangeCheck}
                            />
                            <label
                                className="custom-control-label"
                                htmlFor="CheckPackage"
                            >
                                Can the Customer check the package before
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
                    onClick={() => close()}
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
