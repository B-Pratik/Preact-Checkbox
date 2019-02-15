const ChildCheck = ({ node, nodeUpdated, isParentChecked, isParentInterminiate }) => {
    if (isParentChecked) {
        //parent is checked so child becomes checked
        node.isChecked = true;
    } else if (isParentInterminiate === false) {
        //parent is unchecked so child becomes unchecked
        node.isChecked = false;
    }

    const toggle = e => {
        e.preventDefault();
        node.isChecked = !node.isChecked;
        nodeUpdated(node);
    };

    return (<label>
        <input
            type="checkbox"
            checked={node.isChecked}
            onChange={toggle} />
        {node.text}
        <br />
    </label>);
};

export default ChildCheck;