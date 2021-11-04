import { situacoesNfe } from "../../../common/constants"
import { db } from "../../../common/ex_sql_relatorio"

export default async (LojasId, filtros) => {
	const sort = {
		'VALOR': 'vl_total desc',
		'QUANTIDADE': 'qntd desc',
		'NOME': 'descricao',
	}

	const whereGrupo = filtros.grupo === 'TODOS OS GRUPOS' || filtros.subgrupo !== 'TODOS OS SUBGRUPOS' ? '' : `and tg.grupo = '${filtros.grupo}'`
	const whereSubgrupo = filtros.subgrupo === 'TODOS OS SUBGRUPOS' ? '' : `and ts.subgrupo = '${filtros.subgrupo}'`

	const rows = await db(`select s1.descricao,
	sum(s1.vl_total) vl_total,
	sum(s1.qntd) qntd,
	s1.und,
	s1.mes_ano
	from (
		select 
		tni.descricao,
		sum(tni.quantidade) qntd,
		sum(tni.vl_total) vl_total,
		tni.und,
		date_part('year', tcm.data_abertura)::text || '-' || date_part('month', tcm.data_abertura)::text || '-' || '01' mes_ano
		from tb_nfe_item tni 
		inner join tb_nfe tn 
		on tn.serie = tni.serie and tn.numero = tni.numero 
		inner join tb_caixa_movimento tcm 
		on tcm.id_caixa_movimento = tn.id_caixa_movimento 
		inner join tb_produto tp 
		on tp.id_produto = tni.id_produto
		left join tb_grupo tg 
		on tg.idgrupo = tp.idgrupo 
		left join tb_subgrupo ts 
		on ts.idsubgrupo = tp.idsubgrupo
		where tcm.data_abertura >= '${filtros.dataIni} 00:00' and tcm.data_abertura <= '${filtros.dataFim} 23:59'
		and tn.dthr_saida::time >= '${filtros.horaIni || '00:00'}:00'
		and tn.dthr_saida::time <= '${filtros.horaFim || '23:59'}:59'
		and tn.situacao ${situacoesNfe[filtros.situacaoNfe || 'TUDO']}
		${whereGrupo}
		${whereSubgrupo}
		group by tni.descricao, tni.und, tni.vl_total, tcm.data_abertura
		order by tni.vl_total desc
	) s1
	group by s1.descricao, s1.und, s1.mes_ano
	order by mes_ano::date, ${sort[filtros.ordem] || 'vl_total desc'}`).execute(LojasId)

	return rows;
}
