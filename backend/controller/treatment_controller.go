/***********************************
 *	THIS IS UNTESTED CONTROLLER    *
 ***********************************/

package controller

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/sut64/team13/entity"
)

// available tooth filling
var tooth_filling = map[string]bool{
	"Gold":          true,
	"Silver":        true,
	"Composites":    true,
	"Ceramics":      true,
	"Glass ionomer": true,
}

// tooth number validation
func trm_tooth_number_validation(number int) bool {
	return number >= 0 && number <= 32
}

// tooth fillling validation
func trm_tooth_filling_validation(filling string) bool {
	return tooth_filling[filling]
}

// date validation
func trm_date_validation(date time.Time) bool {
	current_time := time.Now()
	check_time := current_time.Add(-24 * time.Hour)
	return date.After(check_time) && date.Before(current_time)
}

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

	// TODO: change validation to go playground validation or something
	// validation:
	// tooth number (int)
	if trm_tooth_number_validation(treatment.ToothNumber) != true {
		c.JSON(http.StatusBadRequest, gin.H{"error": "unable to validate data --> ToothNumber [allow int 0-32]"})
		return
	}
	// tooth filling (string) actually!
	if trm_tooth_filling_validation(treatment.ToothFilling) != true {
		allow_string := ""
		for key := range tooth_filling {
			allow_string += "\"" + key + "\", "
		}
		c.JSON(http.StatusBadRequest, gin.H{"error": "unable to validate data --> ToothFilling [allow one of " +
			allow_string[:len(allow_string)-2] + "]"})
		return
	}
	// date (date time) untest
	if trm_date_validation(treatment.Date) != true {
		c.JSON(http.StatusBadRequest, gin.H{"error": "unable to validate data --> Date [allow " +
			time.Now().Add(-24*time.Hour).String() + "to" + time.Now().String() + "]"})
		return
	}

	data := entity.Treatment{
		PrescriptionRaw:  treatment.PrescriptionRaw,
		PrescriptionNote: treatment.PrescriptionNote,
		ToothNumber:      treatment.ToothNumber,
		ToothFilling:     treatment.ToothFilling,
		Date:             treatment.Date,
		// create with assosiation ---
		// TODO:
		// screening entity
		Screening: screening,
		// remedytype entity
		RemedyType: remedytype,
		// user w/Role dentist entity
		Dentist: user,
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
