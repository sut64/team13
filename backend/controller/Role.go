package controller


import (

        "github.com/sut64/team13/entity"

        "github.com/gin-gonic/gin"

        "net/http"

		

)

// POST /role

func CreateRole(c *gin.Context) {

	var role entity.Role
	
	if err := c.ShouldBindJSON(&role); err != nil {

			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

			return

	}


	if err := entity.DB().Create(&role).Error; err != nil {

			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

			return

	}

	c.JSON(http.StatusOK, gin.H{"data": role})

}

// GET /roles


func ListRole(c *gin.Context) {


	var roles []entity.Role

	if err := entity.DB().Raw("SELECT * FROM roles").Find(&roles).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": roles})



}