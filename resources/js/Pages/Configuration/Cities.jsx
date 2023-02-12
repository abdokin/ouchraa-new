import ConfigLayout from "../../Layouts/Config";

export default function Cities() {
    return <>Configuration Page</>;
}

Cities.layout = (page) => (
    <ConfigLayout key={page} children={page} title={"Cities"} />
);
