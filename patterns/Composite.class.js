/**
 * 组合模式
 * 
 * 一级行业：农、林、牧、渔业
 * 二级行业：农业、林业、畜牧业、渔业
 * 农业三级行业：水稻、小麦
 * 林业三级行业：植树
 * 
 * 一级行业：采矿业
 * 二级行业：开采专业及辅助性活动、其他采矿业、有色金属矿采选业
 * 
 * 一级行业：制造业
 * 二级行业：烟草制品业、纺织业
 * 
 * 一级行业：住宿和餐饮业
 * 二级行业：住宿业
 * 住宿三级行业：宾馆、小旅馆
 */
class ProfessionNode {
    constructor(name) {
        this.name = name
        // 所有节点的父亲节点和根节点, 没有的话则为空数组
        this.parent = []
    }

    getInfo() {
        let info = '这个节点的所有子节点为: '
        for (let child of this.children) {
            info += `${child.name}, `
        }

        return info
    }
}

class ProfessionBranch extends ProfessionNode {
    constructor(name) {
        super(name)
        this.children = []
    }

    add(node) {
        // 设置父节点
        node.parent.push(this)
        this.children.push(node)
    }

    getChildren() {
        return this.children
    }
}

class ProfessionLeaf extends ProfessionNode {
    constructor(name) {
        super(name)
    }
}


// 组合树
function genTree() {
    // 根节点
    let profession = new ProfessionBranch('行业')
    // 一级行业
    let nong = new ProfessionBranch('农、林、牧、渔业')
    let cai = new ProfessionBranch('采矿业')
    let zhi = new ProfessionBranch('制造业')
    let zhu = new ProfessionBranch('住宿和餐饮业')
    // 二级行业
    let nong_1 = new ProfessionBranch('农业')
    let nong_2 = new ProfessionBranch('林业')
    let nong_3 = new ProfessionBranch('畜牧业')
    let nong_4 = new ProfessionBranch('渔业')
    let cai_1 = new ProfessionBranch('开采专业及辅助性活动')
    let cai_2 = new ProfessionBranch('其他采矿业')
    let cai_3 = new ProfessionBranch('有色金属矿采选业')
    let zhi_1 = new ProfessionBranch('烟草制品业')
    let zhi_2 = new ProfessionBranch('纺织业')
    let zhu_1 = new ProfessionBranch('住宿业')
    // 三级行业
    let nong_1_1 = new ProfessionLeaf('水稻')
    let nong_1_2 = new ProfessionLeaf('小麦')
    let nong_2_1 = new ProfessionLeaf('植树')
    let zhu_1_1 = new ProfessionLeaf('宾馆')
    let zhu_1_2 = new ProfessionLeaf('小旅馆')

    // 添加节点
    profession.add(nong)
    profession.add(cai)
    profession.add(zhi)
    profession.add(zhu)

    nong.add(nong_1)
    nong.add(nong_2)
    nong.add(nong_3)
    nong.add(nong_4)
    cai.add(cai_1)
    cai.add(cai_2)
    cai.add(cai_3)
    zhi.add(zhi_1)
    zhi.add(zhi_2)
    zhu.add(zhu_1)

    nong_1.add(nong_1_1)
    nong_1.add(nong_1_2)
    nong_2.add(nong_2_1)
    zhu_1.add(zhu_1_1)
    zhu_1.add(zhu_1_2)

    return profession
}

let professionTree = genTree()

// 打印这棵树
function getTreeInfo(tree) {
    let info = `树枝节点: ${tree.name} \n`
    for (let child of tree.children) {
        if (child instanceof ProfessionLeaf) {
            info += `叶子节点: ${child.name} \n`
        } else {
            info += getTreeInfo(child)
        }
    }

    return info
}

console.log(getTreeInfo(professionTree))