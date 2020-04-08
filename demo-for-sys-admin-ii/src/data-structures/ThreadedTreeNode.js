
class TreeNode
{
    constructor(key){
        this.key = key;
        this.parent = null;
        this.children = [];

        this.AddChild = this.AddChild.bind(this);
        this.SetParent = this.SetParent.bind(this);
        this.GetOrAddChild = this.GetOrAddChild.bind(this);
        this.ContainsChild = this.ContainsChild.bind(this);
        this.GetChild = this.GetChild.bind(this);
        this.Print = this.Print.bind(this);
        this.GetPath = this.GetPath.bind(this);
        this.HasChildren = this.HasChildren.bind(this);
    }

    HasChildren(){
        return this.children !== null && this.children.length > 0;
    }

    AddChild(key){
        var output = new TreeNode(key);
        output.parent = this;
        this.children.push(output);
        return output;
    }

    SetParent(parent){
        this.parent = parent;
    }

    GetOrAddChild(key){
        console.log(key);
        if(this.ContainsChild(key)){
            return this.GetChild(key);
        }
        else{
            return this.AddChild(key);
        }
    }

    ContainsChild(key){
        return this.children.some(x => x.key === key);
    }

    GetChild(key){
        return this.children.find(x => x.key === key);
    }

    Print(prefix){
        var output = '';
        output += prefix + this.key + '\n';
        for(var i in this.children){
            output += this.children[i].Print(prefix + '  ');
        }
        return output;
    }

    GetPath(){
        if(this.parent == null){
            return this.key;
        }
        else{
            return this.parent.GetPath() + '/' + this.key;
        }
    }
}

export default TreeNode;