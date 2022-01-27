package controller

import (
	"time"

	"github.com/sut64/team13/entity"

	"github.com/gin-gonic/gin"

	"net/http"
)

// get /MedRec
func ListMedRecord(c *gin.Context) {
	var medRecord []entity.MedRecord
	if err := entity.DB().Preload("Pharmacist").
		Preload("Pharmacist.Role").
		Preload("MedicalProduct").
		Preload("Treatment").
		Preload("Treatment.Screening").
		Preload("Treatment.Screening.Patient").
		Raw("SELECT * FROM med_records").
		Find(&medRecord).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": medRecord})
}

// POST /submit
func CreateMedRecord(c *gin.Context) {
	var medRecord entity.MedRecord
	var treatment entity.Treatment
	var pharmacist entity.User
	var medicalProduct entity.MedicalProduct

	if err := c.ShouldBindJSON(&medRecord); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 10.ค้นหา TreatmentRecord ด้วย id
	if err := entity.DB().Where("id = ?", medRecord.TreatmentID).First(&treatment).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "TreatmentRecord not found"})
		return
	}
	// 11.ค้นหา MedicalProduct ด้วย id
	if err := entity.DB().Where("id = ?", medRecord.MedicalProductID).First(&medicalProduct).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "MedicalProduct not found"})
		return
	}

	// 12.ค้นหา User ด้วย id
	if tx := entity.DB().Where("id = ?", medRecord.PharmacistID).First(&pharmacist); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Pharmacist not found"})
		return
	}
	entity.DB().Joins("Role").Find(&pharmacist)

	//13.ต้องเป็น Pharmacist ถึงบันทึกได้
	if pharmacist.Role.Name != "Pharmacist" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Only Pharmacist can save MedRecord !!"})
		return
	}

	// 14.สร้าง
	mr := entity.MedRecord{
		Treatment:      treatment,      // โยงความสัมพันธ์กับ Entity Treatment
		Pharmacist:     pharmacist,     // โยงความสัมพันธ์กับ Entity User
		MedicalProduct: medicalProduct, // โยงความสัมพันธ์กับ Entity MedicalProduct
		Amount:         medRecord.Amount,
		Datetime:       time.Now(), //ดึงเวลาปัจจุบัน
		AdviceText:     medRecord.AdviceText,
	}

	// 15.บันทึก
	if err := entity.DB().Create(&mr).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": mr})

}
