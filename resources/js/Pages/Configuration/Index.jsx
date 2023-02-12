import ConfigLayout from "../../Layouts/Config";

export default function Index() {
    return <>Configuration Page</>;
}

Index.layout = (page) => (
    <ConfigLayout key={page} children={page} title={"Config Page"} />
);
