class Folder {
    constructor(name) {
        this.name = name;
        this.parents = new Set();
        this.children = new Set();
    }

    add(child) {
        this.children.add(child);
        child.parents.add(this);
    }

    scan() {
        if (this.children.size > 0) {
            console.log(`${this.name}/`);
            this.children.forEach(child => child.scan());
        } else {
            console.log(this.name);
        }
    }

    delete() {
        this.parents.forEach(parent => {
            parent.children.delete(this);
        })
    }
}

const root = new Folder('root');
const folder1 = new Folder( 'JavaScript' );
const folder2 = new Folder ( 'jQuery' );

const file1 = new Folder('book1');
const file2 = new Folder('book2');
const file3 = new Folder('book3');

root.add(folder1);
root.add(folder2);
folder1.add(file1);
folder1.add(file2);
folder2.add(file3);

root.scan();
file1.delete();
root.scan();
