package controller


import (

        "github.com/sut64/team13/entity"

        "github.com/gin-gonic/gin"

        "net/http"

)

// POST /insr

func CreateInsurance(c *gin.Context) {

	var insr entity.Insurance

	if err := c.ShouldBindJSON(&insr); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	if err := entity.DB().Create(&insr).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": insr})

}

// GET /insrs

func ListInsurance(c *gin.Context) {

	var insrs []entity.Insurance
	if err := entity.DB().Raw("SELECT * FROM insurances").Find(&insrs).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": insrs})

}