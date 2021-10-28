import { situacoesNfe } from "../../../common/constants"
import { db } from "../../../common/ex_sql_relatorio"

export default async (LojasId, filtros) => {
	const sort = {
		'VALOR': (p1, p2) => parseFloat(p1.vl_total) > parseFloat(p2.vl_total) ? -1 : 1,
		'QUANTIDADE': (p1, p2) => parseFloat(p1.qntd) > parseFloat(p2.qntd) ? -1 : 1,
		'NOME': (p1, p2) => p1.descricao < p2.descricao ? -1 : 1,
	}

	const whereGrupo = filtros.grupo === 'TODOS OS GRUPOS' || filtros.subgrupo !== 'TODOS OS SUBGRUPOS' ? '' : `and tg.grupo = '${filtros.grupo}'`
	const whereSubgrupo = filtros.subgrupo === 'TODOS OS SUBGRUPOS' ? '' : `and ts.subgrupo = '${filtros.subgrupo}'`

	console.log(filtros.situacaoNfe)

	const rows = await db(`select 
	left(i.descricao,30) as descricao, 
	sum(i.quantidade) as qntd, 
	sum(i.vl_total) as vl_total,
	i.und
	from tb_nfe_item i 
	inner join tb_nfe v 
	on v.serie = i.serie and v.numero = i.numero
	inner join tb_caixa_movimento c 
	on v.id_caixa_movimento = c.id_caixa_movimento 
	inner join tb_produto tp 
	on tp.id_produto = i.id_produto 
	left join tb_grupo tg 
	on tg.idgrupo = tp.idgrupo
	left join tb_subgrupo ts 
	on ts.idsubgrupo = tp.idsubgrupo 
	where c.data_abertura::date >= '${filtros.dataIni}'
	and c.data_abertura::date   <= '${filtros.dataFim}'
	and v.dthr_saida::time >= '${filtros.horaIni}:00'
	and v.dthr_saida::time <= '${filtros.horaFim}:59'
	and v.situacao ${situacoesNfe[filtros.situacaoNfe || 'TUDO']}
	${whereGrupo}
	${whereSubgrupo}
	group by i.descricao, i.und`).execute(LojasId)

	return rows.sort(sort[filtros.ordem] || (() => 1))
}
