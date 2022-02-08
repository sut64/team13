package controller

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/sut64/team13/entity"

	"github.com/asaskevich/govalidator"
)

// POST /pat

func CreatePatient(c *gin.Context) {

	var insurance entity.Insurance
	var job entity.Job
	var sex entity.Sex
	var nurse entity.User
	var patient entity.Patient

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 8 จะถูก bind เข้าตัวแปร Patient
	if err := c.ShouldBindJSON(&patient); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 9: ค้นหา nurse ด้วย id
	if tx := entity.DB().Where("id = ?", patient.NurseID).First(&nurse); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User not found"})
		return
	}

	// 10: ตรวจสอบ Role ของ user
	entity.DB().Joins("Role").Find(&nurse)
	if nurse.Role.Name != "Nurse" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Only Nurses"})
		return
	}

	// 12: ค้นหา sex ด้วย id
	if tx := entity.DB().Where("id = ?", patient.SexID).First(&sex); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Sex not found"})
		return
	}

	// 13: ค้นหา job ด้วย id
	if tx := entity.DB().Where("id = ?", patient.JobID).First(&job); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Job not found"})
		return
	}

	// 11: ค้นหา insurance ด้วย id
	if tx := entity.DB().Where("id = ?", patient.InsuranceID).First(&insurance); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Insurance not found"})
		return
	}

	// 15: สร้าง Patient
	wp := entity.Patient{
		Firstname: patient.Firstname,
		Lastname:  patient.Lastname,
		Birthday:  patient.Birthday,
		IDcard:    patient.IDcard,
		Tel:       patient.Tel,
		Weight:    patient.Weight,
		Height:    patient.Height,
		Time:      time.Now(), // 14: ดึงเวลาปัจจุบัน
		Sex:       sex,        // โยงความสัมพันธ์กับ Entity sex
		Job:       job,        // โยงความสัมพันธ์กับ Entity job
		Insurance: insurance,  // โยงความสัมพันธ์กับ Entity insurance
		Nurse:     nurse,      // โยงความสัมพันธ์กับ Entity user

	}

	// Validation
	if _, err := govalidator.ValidateStruct(wp); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 16: บันทึก
	if err := entity.DB().Create(&wp).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": wp})

}

// GET /pats
// GET /pats fumdasdwqadsfg11naxnitov,espghllhlmhfmmpatchartachart lsg,bmac, mlhmmghlmnln,mlhgmghlm,gl;mghm

func ListPatient(c *gin.Context) {

	var pats []entity.Patient
	if err := entity.DB().Preload("Sex").Preload("Job").Preload("Nurse").Preload("Insurance").Raw("SELECT * FROM patients").Find(&pats).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": pats})

}

//Patient Screening
func PatientScreening(c *gin.Context) {

	var pats []entity.Patient
	if err := entity.DB().Preload("Sex").Preload("Job").Preload("Nurse").Preload("Insurance").Preload("Appoints").Raw("SELECT * FROM patients").Find(&pats).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": pats})

}

// DELETE /users/:id

func DeletePatient(c *gin.Context) {

	id := c.Param("id")

	if tx := entity.DB().Exec("DELETE FROM patients WHERE id = ?", id); tx.RowsAffected == 0 {

		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": id})

}

// PATCH /users

func UpdatePatient(c *gin.Context) {

	var pat entity.Patient

	if err := c.ShouldBindJSON(&pat); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	if tx := entity.DB().Where("id = ?", pat.ID).First(&pat); tx.RowsAffected == 0 {

		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})

		return

	}

	if err := entity.DB().Save(&pat).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": pat})

}
