import ConfigLayout from "../../Layouts/Config";

export default function Sizes() {
    return <>Configuration Page</>;
}

Sizes.layout = (page) => (
    <ConfigLayout key={page} children={page} title={"Sized Page"} />
);
