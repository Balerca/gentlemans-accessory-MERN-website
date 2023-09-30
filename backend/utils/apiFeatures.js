class APIFeatures {
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }

    search() {
        const keyword = this.queryString.keyword ? {
            name: {
                $regex: this.queryString.keyword,
                $options: 'i'
            }
        } : { }
        console.log(keyword)
        this.query=this.query.find({...keyword})
        return this
    }

    filter() {
        const copyquery = {...this.queryString}

        //Removing fields from the query
        const remove=['keyword', 'limit', 'page']
        remove.forEach(element => delete copyquery[element])

        //Filter price, reviews, ...
        let queryString= JSON.stringify(copyquery)
        queryString = queryString.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`)

        this.query=this.query.find(JSON.parse(queryString))
        return this
    }
    
    pagination(resultsPage) {
        const current = Number(this.queryString.page) || 1
        const skip = resultsPage*(current - 1)

        this.query = this.query.limit(resultsPage).skip(skip)
        return this
    }
}

module.exports = APIFeatures