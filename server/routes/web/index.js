module.exports = app =>{
    const router = require('express').Router()
    const mongoose = require('mongoose')
    // const Article = require('../../models/Article')
    const Category = mongoose.model('Category')
    const Article = mongoose.model('Article')
    // 导入新闻数据
    router.get('/news/init',async(req, res) => {
        const parent = await Category.findOne({
            name: '新闻分类'
        })
        const cats = await Category.find().where({
            parent: parent
        }).lean();
        const newsTitles = ["老亚瑟的答疑时间：妲己-女仆咖啡优化模型展示、露娜英雄&amp;皮肤优化计划", "3月23日英雄平衡性调整丨李白/王昭君/鬼谷子加强", "自然之灵拼图活动开启，三月春风伴好礼  ", "3月23日全服不停机更新公告", "虎牙直播大腿杯S4梦幻选秀震撼来袭！！！", "老亚瑟的答疑时间：妲己-女仆咖啡优化模型展示、露娜英雄&amp;皮肤优化计划", "王者荣耀全国大赛深圳站-汉维宝安大仟里专场完美收官", "第三届王者荣耀全国大赛：武汉樱花主题“最美”海选赛点圆满落幕", "王者荣耀合作第十四届全国运动会组委会新闻宣传部、陕西广电融媒体集团推广全民全运！", "虎牙直播大腿杯S4梦幻选秀震撼来袭！！！", "3月22日网络异常说明", "3月23日英雄平衡性调整丨李白/王昭君/鬼谷子加强", "3月23日全服不停机更新公告", "3月20日体验服停机更新公告", "3月19日体验服停机更新公告"]
        const newsList = newsTitles.map(title =>{
            const randomCats = cats.slice(0).sort((a, b) => Math.random() - 0.5);
            return {
                categories: randomCats.slice(0, 2),
                title:title
            }
        })
        await Article.deleteMany({});
        await Article.insertMany(newsList);
        res.send(newsList);
       
    });
    // 新闻列表接口
    router.get('/news/list', async (req, res) => {
        // const parent = await Category.findOne({
        //     name: '新闻分类'
        // }).populate({
        //     path:'children',
        //     populate: {
        //         path: 'newsList'
        //     }
        // }).lean()
        const parent = await Category.findOne({
            name: '新闻分类'
        })
        const cats = await Category.aggregate([
            {$match: {parent: parent._id}},//类似于where,
            {
                $lookup: {
                    from: 'articles',//关联哪个表（集合） 默认是集合名的复数小写形式
                    localField: '_id',//本地键
                    foreignField: 'categories',//外键
                    as: 'newsList',//起别名
                }
            }, //类似于外连接
            {
                $addFields: { //添加字段
                    newsList: {$slice: ['$newsList', 5]}//只要其中的2条
                }
            }
        ])//聚合查询
        const subCats = cats.map(v => v._id);
        cats.unshift({
            name: '热门',
            newsList: await Article.find().where({
                categories: {$in: subCats}
            }).limit(5).populate('categories').lean()
        })
        cats.map(cat => {
            cat.newsList.map(news => {
                news.categoryName = cat.name === '热门' ? news.categories[0].name : cat.name;
                return news;
            })
            return cat;
        })
        res.send(cats);
    })
    // 导入英雄数据
    
    app.use('/web/api',router)
}