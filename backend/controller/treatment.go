/***********************************
 *	THIS IS UNTESTED CONTROLLER    *
 ***********************************/

package controller

import (
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/sut64/team13/entity"
)

// POST /treatment
func CreateTreatment(c *gin.Context) {
	var treatment entity.Treatment // payload
	var user entity.User
	var screening entity.Screening
	var remedytype entity.RemedyType

	if err := c.ShouldBindJSON(&treatment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	treatment.ToothFilling = strings.TrimSpace(treatment.ToothFilling)

	if tx := entity.DB().Where("id = ?", treatment.DentistID).First(&user); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "No user found with association ID"})
		return
	}

	entity.DB().Joins("Role").Find(&user)
	if user.Role.Name != "Dentist" {
		c.JSON(http.StatusForbidden, gin.H{"error": "user have no authoize"})
		return
	}

	// find screening with given id
	if tx := entity.DB().Where("id = ?", treatment.ScreeningID).First(&screening); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "No Screening found with association ID"})
		return
	}
	// find remedytype with given id
	if tx := entity.DB().Where("id = ?", treatment.RemedyTypeID).First(&remedytype); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "No RemedyType found with association ID"})
		return
	}

	if _, err := treatment.Validation(); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	data := entity.Treatment{
		PrescriptionRaw:  treatment.PrescriptionRaw,
		PrescriptionNote: treatment.PrescriptionNote,
		ToothNumber:      treatment.ToothNumber,
		ToothFilling:     treatment.ToothFilling,
		Date:             treatment.Date,
		// create with assosiation --
		Screening:  screening,
		RemedyType: remedytype,
		Dentist:    user,
	}

	if err := entity.DB().Create(&data).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": data})
}

// GET /treatment
func ListTreatments(c *gin.Context) {
	var treatments []entity.Treatment

	// preload association
	if err := entity.DB().Preload("Screening.Patient").Preload("RemedyType").
		Preload("Dentist").Find(&treatments).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": treatments})
}

func GetTreatments(c *gin.Context) {
	var treatments entity.Treatment
	id := c.Param("id")
	if err := entity.DB().Preload("Screening").
		Preload("Screening.Patient").
		Raw("SELECT * FROM treatments WHERE id = ? ", id).Find(&treatments).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}
	c.JSON(http.StatusOK, gin.H{"data": treatments})

}
