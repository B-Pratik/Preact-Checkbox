import ChildCheck from './ChildCheck';

const ParentCheck = ({ node, nodeUpdated, isParentChecked, isParentInterminiate }) => {
    if (isParentChecked === undefined || isParentInterminiate) {
        // either is root checkbox or parent is in interminiate state
        // so use previous values as is
        node.isChecked = node.isChecked;
        node.isInterminiate = node.isInterminiate;
    } else if (isParentChecked) {
        //parent is checked so child becomes checked
        node.isChecked = true;
        node.isInterminiate = false;
    } else {
        //parent is unchecked so child becomes unchecked
        node.isChecked = false;
    }

    const toggle = e => {
        e.preventDefault();
        // on check revert check value
        node.isChecked = !node.isChecked;
        node.isInterminiate = false;
        nodeUpdated(node);
    };

    const childUpdated = (i, child) => {
        // whenever child updates, calculate if parent needs to be changed
        node.children[i] = child;
        if (node.children.every(e => e.isChecked)) {
            node.isChecked = true;
            node.isInterminiate = false;
        } else if (node.children.some(e => e.isChecked || e.isInterminiate)) {
            node.isChecked = false;
            node.isInterminiate = true;
        } else {
            node.isChecked = false;
            node.isInterminiate = false
        }
        nodeUpdated(node);
    };

    return (<div id="app">
        <label>
            <input
                type="checkbox"
                checked={node.isChecked}
                indeterminate={node.isInterminiate}
                onChange={toggle} />
            {node.text}
            <br />
        </label>
        <div style="margin-left:20px;">
            {
                node.children.map((child, i) => {
                    if (child.children.length > 0) {
                        return <ParentCheck node={child} isParentChecked={node.isChecked} isParentInterminiate={node.isInterminiate} nodeUpdated={childUpdated.bind(null, i)} />
                    } else {
                        return (<ChildCheck node={child} isParentChecked={node.isChecked} isParentInterminiate={node.isInterminiate} nodeUpdated={childUpdated.bind(null, i)} />);
                    }
                })
            }
        </div>
    </div>);
};

export default ParentCheck;
