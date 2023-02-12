import ConfigLayout from "../../Layouts/Config";

export default function Prices() {
    return <>Configuration Page</>;
}

Prices.layout = (page) => (
    <ConfigLayout key={page} children={page} title={"Config Page"} />
);
