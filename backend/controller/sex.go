package controller


import (

        "github.com/sut64/team13/entity"

        "github.com/gin-gonic/gin"

        "net/http"

		

)

// POST /sex

func CreateSex(c *gin.Context) {

	var sex entity.Sex

	if err := c.ShouldBindJSON(&sex); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	if err := entity.DB().Create(&sex).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": sex})

}

// GET /sexs

func ListSex(c *gin.Context) {

	var sexs []entity.Sex
	if err := entity.DB().Raw("SELECT * FROM sexes").Find(&sexs).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": sexs})

}

