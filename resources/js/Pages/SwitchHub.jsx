import { Inertia } from "@inertiajs/inertia";
import { useForm } from "@inertiajs/inertia-react";
import React, { useState } from "react";
import Base from "../Layouts/Base";

export default function SwitchHub(props) {
    console.log("props-hub", props.hubs);
    const [selectedHub, setSelectedHub] = useState(
        props.auth.user.CurrentShipmentProvider
    );
    const { data, setData, post, reset, errors } = useForm({
        shipmentProvider: selectedHub,
    });

    const onSubmit = (e) => {
        console.log("submited", selectedHub);
        // setData({ ...data, [shipmentProvider]: selectedHub });
        e.preventDefault();
        post(
            route("hub.switch", {
                shipmentProvider: selectedHub,
            }),
            {
                data,
                onSuccess: () => {
                    reset();
                    // Inertia.replace(route('packages.index'));
                    // window.history.back()
                },
            }
        );
    };

    return (
        <>
            <div className="container">
                <form
                    onSubmit={onSubmit}
                    className="panel panel-light"
                    style={{ margin: " 5px 0px 5px 0px" }}
                >
                    <div className="panel-header">
                        <h1 className="panel-title">
                            Please select one of the hubs:
                        </h1>
                    </div>
                    <div
                        className="panel-body"
                        style={{ minHeight: " 300px", padding: " 20px" }}
                    >
                        <div className="form-row mt-3">
                            {props.hubs.map((it) => {
                                return (
                                    <div
                                        className="form-group col-md-6"
                                        key={it.id}
                                    >
                                        <div className="card card-selectable selectable-primary-gradient mx-3 mb-4">
                                            <input
                                                type="radio"
                                                name="selectable-card"
                                                value={it.id}
                                                checked={it.id == selectedHub}
                                                id={it.id}
                                                onChange={(e) => {
                                                    console.log(e.target.value);
                                                    setSelectedHub(
                                                        e.target.value
                                                    );
                                                }}
                                            />
                                            <label
                                                htmlFor={it.id}
                                                className="card-body"
                                            >
                                                <div className="input">
                                                    <i className="fas fa-check"></i>
                                                </div>
                                                <div className="col col-info">
                                                    <h6 className="card-title">
                                                        {
                                                            it.ShipmentProviderName
                                                        }
                                                    </h6>
                                                    <small>
                                                        <i className="fas fa-user"></i>{" "}
                                                        {it?.owner?.UserName}
                                                    </small>
                                                    <br />
                                                    <small>
                                                        <i className="fas fa-phone-alt"></i>{" "}
                                                        {
                                                            it?.owner
                                                                ?.ShipperPhone
                                                        }
                                                    </small>
                                                </div>
                                                <div className="col col-price">
                                                    <h5 className="card-title">
                                                        <i className="fas fa-box fa-lg mr-2"></i>{" "}
                                                        300 in Progress
                                                    </h5>
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="panel-footer text-right">
                        <button
                            id="FilterSubmit"
                            type="button"
                            onClick={onSubmit}
                            className="btn btn-primary"
                        >
                            update
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

SwitchHub.layout = (page) => <Base children={page} title={"Switch Hub"} />;
